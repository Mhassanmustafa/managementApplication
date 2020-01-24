import React from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

const DailyStatistics = () => {
  let salesData = [];
  let date = [];
  const loadData = () => {
    console.log("here");
    axios
      .get("/api/stats/dailysales")
      .then(res => {
        let result = res.data;
        //console.log(result);

        result.map(value => {
          date.push(value.entry[0].date);
          console.log(value.totalAmount);
          salesData.push(value.totalAmount);
        });

        setData({
          labels: date,
          datasets: [
            {
              label: "sales",
              data: salesData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        });
      })
      .catch(e => {
        console.log("Sever is not listenning");
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const [data1, setData] = React.useState();

  return (
    <div id="content">
      <h3>Daily Sales</h3>
      <Line data={data1} width={200} height={90} />
    </div>
  );
};

export default DailyStatistics;
