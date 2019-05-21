
import './app.scss';
import './index.scss';

export default function() {
  return (
    <div className="app">
      <div className="box-container">
        <header className="site-header">
          <div className="box">
            <div className="left">
              这里写网站的名称
            </div>
            <div className="right">
              这里留个登录<br />
              登录显示弹窗，展示第三方授权方式
            </div>
          </div>

          <div className="box">
            <div className="box-center">
              if 用户未登录 显示网站使用说明和目前的人数
            </div>
          </div>

          <div className="box">
            <div className="box-center">
              if 用户登录 显示以下内容
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
