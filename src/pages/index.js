import { Icon, Modal, Input, Radio } from 'antd';
import { useState, useEffect }       from 'react';
import { fetchHabitList }            from '@/action';

import '@/styles/app.scss';
import '@/styles/index.scss';

const indexPage = () => {

  const [needLogin, setLoginStatus] = useState(false);
  const [habitsList, updateHabitsList] = useState([]);
  const [showAddHabitModal, setAddHabitModalStatus] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetchHabitList().then(({ data }) => {
      updateHabitsList(data && data.habitsList);
    });
  };


  const addHabit = () => {
    setAddHabitModalStatus(true);
  }

  return (
    <div className="index-page">
      <div className="box-container">
        <header className="site-header">
          <div className="left">
            <Icon type="menu" />
          </div>
          <div className="site-title">
            iHabit
          </div>
          <div className="right">
            <Icon type="plus" />
          </div>
        </header>
        <section className="habits-container">
          {habitsList.map(o => {
            return(
              <div className="box" key={o.id}>
                <div className="habit-icon">
                  <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />
                </div>
                <div className="info">
                  <div className="name">{o.name}</div>
                  <div className="score">奖励分：{o.score}</div>
                </div>
                <div className="check right">
                  <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                </div>
              </div>
            )})
          }
        </section>
        <div className="add-habit" onClick={addHabit}>
          <Icon type="plus" />
        </div>
        <Modal
          title="登录"
          visible={needLogin}
        >
          <Icon type="github" />
          <p>Github 账号快速登录</p>
        </Modal>
        <Modal
          title="添加习惯"
          visible={showAddHabitModal}
          closable={false}
        >
            <Input placeholder="请输入习惯名称"/>
            <Input placeholder="请输入习惯描述"/>
            <Radio.Group defaultValue="1" buttonStyle="solid">
              <Radio.Button value={1}>简单</Radio.Button>
              <Radio.Button value={2}>一般</Radio.Button>
              <Radio.Button value={3}>困难</Radio.Button>
            </Radio.Group>
        </Modal>
      </div>
    </div>
  );
}

export default indexPage;
