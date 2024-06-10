import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetNumberCategories } from "../../../redux/activity/activityThunk";
import { ActivityDataSelector } from "../../../redux/activity/activitySelector";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const Statistics = () => {
  const dispatch = useDispatch();
  const numberCategories = useSelector(ActivityDataSelector);
  const today = new Date();
  var firstDay = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  ).toISOString();
  var lastDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    0
  ).toISOString();

  console.log(firstDay, lastDay);

  useEffect(() => {
    const getNumberCategories = async () => {
      try {
        // @ts-ignore
        // prettier-ignore
        await dispatch(GetNumberCategories({ firstDay: firstDay, lastDay: lastDay }));
      } catch (error) {
        console.error("Error occurred:", error.message);
      }
    };

    getNumberCategories();
  }, []);

  console.log();

  const config = {
    type: "line",
    // data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
  };

  const categoryData = {
    labels: numberCategories?.map((item) => Object.keys(item)[0]),
    datasets: [
      {
        label: "Quantity",
        data: numberCategories?.map((item) => Object.values(item)[0]),
        backgroundColor: [
          "#0A58CA",
          "#97B3FF",
          "#BCD4FF",
          "#7293FF",
          "#A0BBFF",
          "#4975EC",
          "#00349E",
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
    options: { responsive: false, maintainAspectRatio: false },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((_, index) => index),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map((_, index) => index),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div className="account">
      <div className="page-title">
        <div className="title-icon">
          <i className="bi bi-bar-chart-fill" />
        </div>
        <div className="title-name">Thống kê</div>
      </div>
      <div
        style={{
          marginTop: 20,
          display: "flex",
          gap: "16%",
          justifyContent: "center",
        }}
      >
        <div className="statistics-card">
          <div className="container">
            <Doughnut data={categoryData} />
          </div>
          <div className="title">
            Biểu đồ số lượng hoạt động theo loại hoạt động{" "}
            <span>tháng {today.getMonth()}</span>
          </div>
        </div>
        <div className="statistics-card">
          <div className="container">
            <Doughnut data={categoryData} />
          </div>
          <div className="title">Chưa biết</div>
        </div>
      </div>
      {/* <div
        style={{
          width: "100%",
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 40,
        }}
      >
        <Line data={data} />
      </div> */}
    </div>
  );
};

export default Statistics;
