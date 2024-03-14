import { MainLayout } from "components";
import { PATH } from "constant";
import { Attendance, Statistic, Wheel } from "pages";
import { RouteObject } from "react-router-dom";

export const route: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: PATH.statistic,
                element: <Statistic />
            },
            {
                path: PATH.attendance,
                element: <Attendance />
            },
            {
                path: PATH.wheel,
                element: <Wheel />
            }
        ]
    }
];