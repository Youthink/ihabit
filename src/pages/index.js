import { Icon, Modal, Input, Radio } from 'Antd';
import { useState } from 'react';
import '../styles/app.scss';
import '../styles/index.scss';

const indexPage = () => {

  const [needLogin, setLoginStatus] = useState(false);
  const [showAddHabitModal, setAddHabitModalStatus] = useState(false);

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
        <div className="box">
          <div className="box-center">
            if 用户未登录 显示网站使用说明和目前的人数
          </div>
        </div>

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
