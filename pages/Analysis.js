// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, RefreshControl,  SafeAreaView, Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LineChart, BarChart, PieChart, ProgressChart, StackedBarChart } from 'react-native-chart-kit';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash"

function Analysis({route}) {

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [pieChart, setPiechart] = useState([
    "Status",
    "Number of Students",
  ]);

  const [bezierChart, setBezierchart] = useState([
    "Students",
    "Frequency",
  ]);

  const [progressChart, setProgresschart] = useState([
    "Students",
    "Progress",
  ]);

  const [stackedChart, setStackedchart] = useState([
    "Check Item",
    "Number of Responses",
  ]);
  const [direction, setDirection] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState(null)

  const [complete, setComplete] = useState([
    {
      Completeness: "Completed",
      Students: 0,
    },
    {
      Completeness: "Not Completed",
      Students: 0,
    }
  ]);

  const [students, setStudents] = useState([
    {
      Students: "CSAM",
      Frequency: 21500000,
    },
    {
      Students: "MATH",
      Frequency: 8538000,
    },
    {
      Students: "PHYSICS",
      Frequency: 8538000,
    },
    {
      Students: "ACS",
      Frequency: 8538000,
    }
  ]);

  const [progress, setProgress] = useState([
    {
      Students: "CSAM",
      Progress: 21500000,
    },
    {
      Students: "MATH",
      Progress: 8538000,
    },
    {
      Students: "PHYSICS",
      Progress: 21500000,
    }
  ]);

  const [outcomes, setOutcome] = useState([]); //{questions : [] , data : [[]]}

  const getNotCompleted = () => {
    fetch(`http://172.16.8.143:5000/notcompleted_checklist?courseName=${route.params.courseName}&&topic=${route.params.topic}`)
    .then(response => response.text())
    .then(json => {
      complete[1].Students = JSON.parse(json).response.length;
      getCompleted();
      
    })
    .catch(error => {
      console.error(error);
    });
  };

  const isIn = (ID, array) => {
    return array.some((countedIDS) => countedIDS === ID);
  };

  const getCompleted = () => {
    fetch(`http://172.16.8.143:5000/completed_checklist?courseName=${route.params.courseName}&&topic=${route.params.topic}`)
    .then(response => response.text())
    .then(json => {
      let student = [];
      for (let i = 0; i < JSON.parse(json).response.length; i++){
        if(!isIn(JSON.parse(json).response[i].studentID, student)){
          student.push(JSON.parse(json).response[i].studentID);
        }
      }
      complete[0].Students = student.length;
      getOutcomes();
    })
    .catch(error => {
      console.error(error);
    });
  };

  const iscounted = (ID, array) => {
    return array.some(
      (countedIDS) =>
        countedIDS.ID === ID.ID && countedIDS.studentID === ID.studentID
    );
  };

  const getOutcomes = () => {
    fetch(`http://172.16.8.143:5000/getOutcomes?courseName=Calculus&&topic=Integration`)
    .then(response => response.text())
    .then(json => {
      var checklistitemID = [];
      for(let i  = 0; i < JSON.parse(json).response.length; i++){
        let count = {
          studentID : 
            JSON.parse(json).response[i].studentID,
          ID: 
            JSON.parse(json).response[i].checkListItemID, 
          yes: 
            JSON.parse(json).response[i].outcome === 'yes' ? 1 : 0,
          no: 
            JSON.parse(json).response[i].outcome === 'yes' ? 0 : 1
        };

        const index = checklistitemID.findIndex(
          (item) =>
            item.ID === count.ID && item.studentID === count.studentID
        );

        if (index === - 1){
          checklistitemID.push(count);
        } 
        else{
          // Update existing values
          if(!iscounted(count, checklistitemID)){
            checklistitemID[index].yes += count.yes;
            checklistitemID[index].no += count.no;
          }
        }
      }
      for(let i = 0; i < checklistitemID.length; i++){
        let out = {question: 'Question ' + (i + 1), yes: checklistitemID[i].yes, no: checklistitemID[i].no}
        setOutcome([...outcomes, out]);
        outcomes.push(out);
      }
      console.log(outcomes);
      // setOutcome(checklistitemID);
      onRefresh();
    })
    .catch(error => {
      console.error(error);
    });
    
  };

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc"
    const sortedPie = _.orderBy(complete, [column], [newDirection])
    const sortedBezier = _.orderBy(students, [column], [newDirection])
    const sortedProgress = _.orderBy(progress, [column], [newDirection])
    const sortedStacked = _.orderBy(outcomes, [column], [newDirection])

    setSelectedColumn(column)
    setDirection(newDirection)
    setComplete(sortedPie)
    setStudents(sortedBezier)
    setProgress(sortedProgress)
    setOutcome(sortedStacked)

  };

  const pieTableHeader = () => (
    <View style={sortTablestyles.tableHeader}>
      {
        pieChart.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={sortTablestyles.columnHeader}
                onPress={() => sortTable(column)}>
                <Text style={sortTablestyles.columnHeaderTxt}>{column + " "}
                  {selectedColumn === column && <MaterialCommunityIcons
                    name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                  />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  );

  const bezierTableHeader = () => (
    <View style={sortTablestyles.tableHeader}>
      {
        bezierChart.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={sortTablestyles.columnHeader}
                onPress={() => sortTable(column)}>
                <Text style={sortTablestyles.columnHeaderTxt}>{column + " "}
                  {selectedColumn === column && <MaterialCommunityIcons
                    name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                  />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  );

  const progressTableHeader = () => (
    <View style={sortTablestyles.tableHeader}>

      {
        progressChart.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={sortTablestyles.columnHeader}
                onPress={() => sortTable(column)}>
                <Text style={sortTablestyles.columnHeaderTxt}>{column + " "}
                  {selectedColumn === column && <MaterialCommunityIcons
                    name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                  />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  );

  const stackedTableHeader = () => (
    <View style={sortTablestyles.tableHeader}>

      {
        stackedChart.map((column, index) => {
          {
            return (
              <TouchableOpacity
                key={index}
                style={sortTablestyles.columnHeader}
                onPress={() => sortTable(column)}>
                <Text style={sortTablestyles.columnHeaderTxt}>{column + " "}
                  {selectedColumn === column && <MaterialCommunityIcons
                    name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                  />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
        })
      }
    </View>
  );

  const MyBezierLineChart = () => {
    return (
      <>
        <Text style={styles.header}>Student Participation by Schools</Text>
        <LineChart
          data={{
            labels: ['CSAM', 'MATH', 'PHYSICS', 'ASS'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
              },
            ],
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={220}
          // yAxisLabel={'Rs'}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };
  
  const MyProgressChart = () => {
    return (
      <>
        <Text style={styles.header}>Student Learning Experience Monitoring Progress</Text>
        <ProgressChart
          data={{
            labels: ["CSAM", "MATH", "PHYSICS"],
            data: [0.4, 0.6, 0.8],
            color: ["#00ced1", "#008b8b", "#00008b"]
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          hideLegend={false}
        />
      </>
    );
  };
  
  // const MyBarChart = () => {
  //   return (
  //     <>
  //       <Text style={styles.header}>Bar Chart</Text>
  //       <BarChart
  //         data={{
  //           labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //           datasets: [
  //             {
  //               data: [20, 45, 28, 80, 99, 43],
  //             },
  //           ],
  //         }}
  //         width={Dimensions.get('window').width - 16}
  //         height={220}
  //         yAxisLabel={'Rs'}
  //         chartConfig={{
  //           backgroundColor: '#1cc910',
  //           backgroundGradientFrom: '#eff3ff',
  //           backgroundGradientTo: '#efefef',
  //           decimalPlaces: 2,
  //           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //           style: {
  //             borderRadius: 16,
  //           },
  //         }}
  //         style={{
  //           marginVertical: 8,
  //           borderRadius: 16,
  //         }}
  //       />
  //     </>
  //   );
  // };
  
  const MyStackedBarChart = () => {
    let questions = [];
    let scores = []
    for(let i = 0; i < outcomes.length; i++){
      questions.push(i);
      scores.push([outcomes[i].yes, outcomes[i].no])
    }
    return (
      <>
        <Text style={styles.header}>Student Response</Text>
        <StackedBarChart
          data={{
            labels: questions,
            legend: ['I Understand', "I don't understand"],
            data: scores,
            barColors: ["#00ced1", "#7F7F7F"],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };
  
  const MyPieChart = () => {
    return (
      <>
        <Text style={styles.header}>Student Checklist Completion Summary</Text>
        <PieChart
          data={[
            {
              name: 'Completed',
              population: complete[0].Students,
              color: 'rgba(131, 167, 234, 1)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Not Completed',
              population: complete[1].Students,
              color: '#F00',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
          ]}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        // absolute //for the absolute number remove if you want percentage
        />
      </>
    );
  };

  useEffect(() => {
    getNotCompleted();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

        <View style={styles.container}>
          <View>

            {/*Example of Pie Chart*/}
            <MyPieChart />
            <View style={sortTablestyles.container}>
              <FlatList
                data={complete}
                style={{ width: "90%" }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={pieTableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ ...sortTablestyles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                      <Text style={{ ...sortTablestyles.columnRowTxt, fontWeight: "bold" }}>{item.Completeness}</Text>
                      <Text style={sortTablestyles.columnRowTxt}>{item.Students}</Text>
                    </View>
                  )
                }}
              />
              <StatusBar style="auto" />
            </View>

            {/*Example of Bezier LineChart*/}
            <MyBezierLineChart />
            <View style={sortTablestyles.container}>
              <FlatList
                data={students}
                style={{ width: "90%" }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={bezierTableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{...sortTablestyles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                      <Text style={{ ...sortTablestyles.columnRowTxt, fontWeight: "bold" }}>{item.Students}</Text>
                      <Text style={sortTablestyles.columnRowTxt}>{item.Frequency}</Text>
                    </View>
                  )
                }}
              />
              <StatusBar style="auto" />
            </View>

            {/*Example of Bar Chart*/}

            {/*Example of StackedBar Chart*/}
            <MyStackedBarChart />
            <View style={sortTablestyles.container}>
              <FlatList
                data={outcomes}
                style={{ width: "90%" }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={stackedTableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ ...sortTablestyles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                      <Text style={{ ...sortTablestyles.columnRowTxt, fontWeight: "bold" }}>{item.question}</Text>
                      <Text style={sortTablestyles.columnRowTxt}>{item.yes + item.no}</Text>
                    </View>
                  )
                }}
              />
              <StatusBar style="auto" />
            </View>

            {/*Example of Progress Chart*/}
            {/* <MyProgressChart />
            <View style={sortTablestyles.container}>
              <FlatList
                data={progress}
                style={{ width: "90%" }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={progressTableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ ...sortTablestyles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                      <Text style={{ ...sortTablestyles.columnRowTxt, fontWeight: "bold" }}>{item.Students}</Text>
                      <Text style={sortTablestyles.columnRowTxt}>{item.Progress}</Text>
                    </View>
                  )
                }}
              />
              <StatusBar style="auto" />
            </View> */}

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});

const tablestyles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
});

const sortTablestyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
    // paddingTop: 80
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#7F7F7F",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    alignItems: "center",
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center"
  },
  columnHeaderTxt: {
    color: "black",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  }
});

export default Analysis;

