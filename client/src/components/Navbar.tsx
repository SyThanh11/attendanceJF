import { Tabs, TabsProps } from "antd";
import { Attendance, Statistic, Wheel } from "pages";
import './style.scss';

export const Navbar = () => {
  
    const onChange = (tabName: string) => {
    console.log(tabName);
  }

  const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Thống kê',
        children: <Statistic />
    },
    {
        key: '2',
        label: 'Điểm danh',
        children: <Attendance />
    },
    {
        key: '3',
        label: 'Quay số',
        children: <Wheel />
    }
  ]

  return (
    <Tabs className="Tabs mb-4" defaultActiveKey="1" items={items} onChange={onChange} />
  )
}

export default Navbar