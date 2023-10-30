import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class BarChart extends React.Component {
  componentDidMount() {
    this.renderChart();
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  componentDidUpdate() {
    this.chart.dispose();
    this.renderChart();
    //this.chart.data = this.getData(this.props.data);
  }

  renderChart() {
    let chart = am4core.create("bar-chart", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = this.getData(this.props.data);

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.renderer.labels.template.fillOpacity = 0;
    categoryAxis.renderer.tooltip.dy = 35;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.fillOpacity = 1;
    valueAxis.renderer.labels.template.fill = am4core.color("#FFF");
    valueAxis.renderer.grid.template.strokeOpacity = 0.1;
    valueAxis.renderer.grid.template.stroke = am4core.color("#FFF");
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;
    valueAxis.renderer.baseGrid.strokeOpacity = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "views";
    series.dataFields.categoryX = "name";
    series.tooltipText = "{valueY.value} views";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.pointerOrientation = "vertical";
    series.columnsContainer.zIndex = 100;

    let columnTemplate = series.columns.template;
    columnTemplate.width = am4core.percent(50);
    columnTemplate.maxWidth = 30;
    columnTemplate.column.cornerRadius(30, 2, 2, 2);
    columnTemplate.strokeOpacity = 0;

    series.heatRules.push({
      target: columnTemplate,
      property: "fill",
      dataField: "valueY",
      min: am4core.color("#eec22d"),
      max: am4core.color("#74bc5c"),
    });
    series.mainContainer.mask = undefined;

    let cursor = new am4charts.XYCursor();
    chart.cursor = cursor;
    cursor.lineX.disabled = true;
    cursor.lineY.disabled = true;
    cursor.behavior = "none";

    let bullet = columnTemplate.createChild(am4charts.CircleBullet);
    bullet.circle.radius = 30;
    bullet.valign = "bottom";
    bullet.align = "center";
    bullet.isMeasured = true;
    bullet.mouseEnabled = false;
    bullet.verticalCenter = "bottom";
    bullet.interactionsEnabled = false;

    //let hoverState = bullet.states.create("hover");
    bullet.states.create("hover");
    let outlineCircle = bullet.createChild(am4core.Circle);
    outlineCircle.adapter.add("radius", function (radius, target) {
      let circleBullet = target.parent;
      return circleBullet.circle.pixelRadius + 4;
    });

    let image = bullet.createChild(am4core.Image);
    image.width = 120;
    image.height = 80;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";
    image.propertyFields.href = "href";

    image.adapter.add("mask", function (mask, target) {
      let circleBullet = target.parent;
      return circleBullet.circle;
    });

    let previousBullet;
    chart.cursor.events.on("cursorpositionchanged", function (event) {
      let dataItem = series.tooltipDataItem;
      if (dataItem.column) {
        let bullet = dataItem.column.children.getIndex(1);
        if (previousBullet && previousBullet !== bullet) {
          previousBullet.isHover = false;
        }
        if (previousBullet !== bullet) {
          let hs = bullet.states.getKey("hover");
          hs.properties.dy = -bullet.parent.pixelHeight + 30;
          bullet.isHover = true;
          previousBullet = bullet;
        }
      }
    });
    this.chart = chart;
    this.series = series;
  }

  getData(data) {
    const chartData = [];
    if (data) {
      const dataCount = data.length < 8 ? data.length : 8;
      for (let i = 0; i < dataCount; i++) {
        chartData.push({
          name: data[i].name, //app.decodeHTML(item.name),
          views: data[i].views === 0 ? 10000 : data[i].views,
          href: data[i].image,
          url: data[i].url,
        });
      }
    }
    console.log(chartData);
    return chartData;
  }

  render() {
    return <div className="chart" id="bar-chart"></div>;
  }
}

export default BarChart;
