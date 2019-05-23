import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';

export default function(props) {
  return (
    <LocaleProvider locale={zhCN}>
      <div>
        <header></header>
        { props.children }
        <footer></footer>
      </div>
    </LocaleProvider>
  );
}
