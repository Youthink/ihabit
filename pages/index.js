import { Icon } from 'Antd';
import './styles/app.scss';
import './styles/index.scss';

export default function() {
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

          <div className="add-habit">
            <Icon type="plus" />
          </div>
      </div>
    </div>
  );
}
