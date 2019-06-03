import { Icon, Modal, Input, Radio, message } from "antd";
import { useState, useEffect } from "react";
import { fetchHabitList, completeHabit } from "@/action";
import { todayDate } from "@/utils/dateTimeHelper";

import "@/styles/app.scss";
import "@/styles/index.scss";

const indexPage = () => {
  const [needLogin, setLoginStatus] = useState(false); // eslint-disable-line
  const [habitsList, updateHabitsList] = useState([]);
  const [totalScore, updateTotalScore] = useState({});
  const [showAddHabitModal, setAddHabitModalStatus] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    fetchHabitList({ date: todayDate }).then(({ data }) => {
      updateHabitsList(data && data.habitsList);
      updateTotalScore({
        todayTotalScore: data && data.todayTotalScore,
        weekTotalScore: data && data.weekTotalScore
      });
    });
  };

  const addHabit = () => {
    setAddHabitModalStatus(true);
  };

  const checkInHabit = o => {
    if (o.status === "finish") {
      return;
    }
    completeHabit({ habitId: o.id, date: todayDate }).then(res => {
      res && res.success && message.success(res && res.apiMessage);
      loadData();
    });
  };

  return (
    <div className="index-page">
      <div className="box-container">
        <header className="site-header">
          <div className="left">
            <Icon type="menu" />
          </div>
          <div className="site-title">iHabit</div>
          <div className="right">
            <Icon type="plus" />
          </div>
        </header>
        <section className="score-container">
          <span className="text left">
            今日总分数：{totalScore.todayTotalScore}
          </span>
          <span className="text right">
            本周总分数：{totalScore.weekTotalScore}
          </span>
        </section>
        <section className="habits-container">
          {habitsList.map(o => {
            return (
              <div className="box" onClick={() => checkInHabit(o)} key={o.id}>
                <div className="habit-icon">
                  {/*<Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />*/}
                </div>
                <div className="info">
                  <div className="name">{o.name}</div>
                  <div className="score">
                    {o.status === "finish" ? (
                      <span>已完成，获得 {o.score} 分</span>
                    ) : (
                      <span>分值：{o.score}</span>
                    )}
                  </div>
                </div>
                <div className="check right">
                  {o.status === "finish" ? (
                    <Icon type="like" theme="twoTone" twoToneColor="#eb2f96" />
                  ) : (
                    <Icon
                      type="check-circle"
                      theme="twoTone"
                      twoToneColor="#52c41a"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </section>
        <div className="add-habit" onClick={addHabit}>
          <Icon type="plus" />
        </div>
        <Modal title="登录" visible={needLogin}>
          <Icon type="github" />
          <p>Github 账号快速登录</p>
        </Modal>
        <Modal title="添加习惯" visible={showAddHabitModal} closable={false}>
          <div className="form-item">
            <label className="title">名称</label>
            <Input className="inline" placeholder="请输入习惯名称" />
          </div>
          <div className="form-item">
            <label className="title">描述</label>
            <Input className="inline" placeholder="请输入习惯描述" />
          </div>
          <div className="form-item">
            <label className="title">难度</label>
            <Radio.Group defaultValue="1" buttonStyle="solid">
              <Radio.Button value={1}>简单</Radio.Button>
              <Radio.Button value={2}>一般</Radio.Button>
              <Radio.Button value={3}>困难</Radio.Button>
            </Radio.Group>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default indexPage;
