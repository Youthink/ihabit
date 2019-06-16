import { Icon, Input, Radio, message } from 'antd';
import { Modal, SwipeAction } from 'antd-mobile';
import { useState, useEffect } from 'react';
import {
  fetchHabitList,
  completeHabit,
  addNewHabit,
  deleteHabit,
  updateHabit,
  cancelHabit
} from '@/action';
import { todayDate } from '@/utils/dateTimeHelper';

import '@/styles/app.scss';
import '@/styles/index.scss';

const indexPage = () => {
  const [needLogin, setLoginStatus] = useState(false); // eslint-disable-line
  const [habitsList, updateHabitsList] = useState([]);
  const [totalScore, updateTotalScore] = useState({});
  const [showHabitModal, setHabitModalStatus] = useState(false);
  const [modalStatus, updateModalStatus] = useState('addHabit');
  const [inputHabitName, updateHabitName] = useState('');
  const [inputHabitDesc, updateHabitDesc] = useState('');
  const [inputHabitScore, updateHabitScore] = useState(1);
  const [editHabitId, updateEditHabitId] = useState(0);

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
    setHabitModalStatus(true);
  };

  const deleteHabitHandle = id => {
    deleteHabit(id).then(() => {
      loadData();
    });
  };

  const validation = () => {
    if (!inputHabitName) {
      message.warn('请填写习惯名称~');
      return false;
    }

    return true;
  };

  const submitHabit = () => {
    if (!validation()) {
      return;
    }

    if (modalStatus === 'addHabit') {
      addNewHabit({ name: inputHabitName, score: inputHabitScore }).then(() => {
        message.success('成功添加一枚习惯~~');
        loadData();
        closeHabitModal();
      });
      return;
    }

    if (modalStatus === 'updateHabit') {
      updateHabit({
        id: editHabitId,
        name: inputHabitName,
        score: inputHabitScore
      }).then(() => {
        message.success('习惯更新成功~~');
        loadData();
        closeHabitModal();
      });
      return;
    }
  };

  const checkInHabit = o => {
    if (o.status === 'finish') {
      cancelHabit({ habitId: o.id, habitCompletedId: o.habitCompletedId }).then(
        res => {
          res && res.success && message.success(res && res.apiMessage);
          loadData();
        }
      );
      return;
    }
    completeHabit({ habitId: o.id, date: todayDate }).then(res => {
      res && res.success && message.success(res && res.apiMessage);
      loadData();
    });
  };

  const closeHabitModal = () => {
    setHabitModalStatus(false);
    updateHabitName('');
    updateHabitScore(1);
    updateModalStatus('addHabit');
  };

  return (
    <div className="index-page">
      <div className="box-container">
        <header className="site-header">
          <div className="left">{/*<Icon type="menu" />*/}</div>
          <div className="site-title">iHabit</div>
          <div className="right">{/*<Icon type="plus" />*/}</div>
        </header>
        <section className="score-container">
          <span className="text left">
            今日总分数：{totalScore.todayTotalScore || 0}
          </span>
          <span className="text right">
            本周总分数：{totalScore.weekTotalScore || 0}
          </span>
        </section>
        <section className="habits-container">
          {habitsList.map(o => {
            return (
              <SwipeAction
                key={o.id}
                className="swipe-habit-item"
                autoClose
                right={[
                  {
                    text: '编辑',
                    onPress: () => {
                      updateHabitName(o.name);
                      updateHabitScore(o.score);
                      updateEditHabitId(o.id);
                      updateModalStatus('updateHabit');
                      setHabitModalStatus(true);
                    },
                    style: { backgroundColor: '#108ee9', color: '#FFF' }
                  }
                ]}
                left={[
                  {
                    text: '删除',
                    onPress: () => {
                      Modal.alert('删除习惯', '确认删除该习惯吗?', [
                        { text: '不删除' },
                        { text: '删除', onPress: () => deleteHabitHandle(o.id) }
                      ]);
                    },
                    style: { backgroundColor: '#F4333C', color: '#FFF' }
                  }
                ]}
              >
                <div className="box" onClick={() => checkInHabit(o)}>
                  <div className="habit-icon">
                    {/*<Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />*/}
                  </div>
                  <div className="info">
                    <div className="name">{o.name}</div>
                    <div className="score">
                      {o.status === 'finish' ? (
                        <span>已完成，获得 {o.score} 分</span>
                      ) : (
                        <span>分值：{o.score}</span>
                      )}
                    </div>
                  </div>
                  <div className="check right">
                    {o.status === 'finish' ? (
                      <Icon
                        type="like"
                        theme="twoTone"
                        twoToneColor="#eb2f96"
                      />
                    ) : (
                      <Icon
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                    )}
                  </div>
                </div>
              </SwipeAction>
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
        <Modal
          className="add-habit-modal"
          title={modalStatus === 'addHabit' ? '添加习惯' : '编辑习惯'}
          closable={false}
          visible={showHabitModal}
          transparent
          onClose={() => closeHabitModal()}
          footer={[
            { text: '取消', onPress: () => closeHabitModal() },
            {
              text: modalStatus === 'addHabit' ? '添加' : '编辑',
              onPress: submitHabit
            }
          ]}
        >
          <div className="form-item">
            <label className="title">名称</label>
            <Input
              className="inline"
              value={inputHabitName}
              onChange={e => {
                updateHabitName(e.target.value);
              }}
              placeholder="请输入习惯名称"
            />
          </div>
          <div className="form-item">
            <label className="title">描述</label>
            <Input
              className="inline"
              onChange={e => updateHabitDesc(e.target.value)}
              placeholder="请输入习惯描述"
            />
          </div>
          <div className="form-item">
            <label className="title">难度</label>
            <Radio.Group
              defaultValue={1}
              value={inputHabitScore}
              onChange={e => updateHabitScore(e.target.value)}
              buttonStyle="solid"
            >
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
