import React, { useState } from 'react';
import DatePicker from 'react-native-modern-datepicker';
import {getDate, getFormatedDate} from 'react-native-modern-datepicker';
import { View, TouchableOpacity,Image,Text, Alert, Modal } from 'react-native';
import styles from '../styles';


const DropDown = ({items}) => {

    const IconSeparation = () => <View style={styles.icon_separation} />;
    const Separator = () => <View style={styles.separator} />;

    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD');

    const [isOpen, setState] = useState(false);
    const [viewCalender, setViewCalenderState] = useState(false);
    const [selectedOption, selectOption] = useState('');
    const [openingDate, setOpeningDate] = useState('2023/12/12');
    const [closingDate, setClosingDate] = useState('2023/12/12');

    const optionChoosen = (choice) => {
        selectOption(choice);
        setViewCalenderState(!viewCalender);
        setState(!isOpen);
    }

    const changeDate = (date) => {
        if (selectedOption === 'Set openinig date'){
            setOpeningDate(date);
            // items.openDate = date;
        }
        else {
            setClosingDate(date);
        }
    }

    return (
        <View style = {styles.dropdownIcon}>
            <TouchableOpacity onPress={() => setState(!isOpen)}>
                <Image
                    style = {styles.tinyLogo}
                    source = {isOpen ? require('./../icons/up.png') : require('./../icons/drop.png')}
                />
            </TouchableOpacity>

            <IconSeparation/>

            {isOpen && (<View>
                {items.map((values, index) => {
                    return(
                        <Text style = {styles.dropdownText} key = {index} onPress={() => optionChoosen(values.openDate)}>{values.openDate}</Text>
                    );
                })} 
            </View>)}
            <Modal
                animationType='slide'
                transparent={true}
                visible={viewCalender}
            >
                <View style = {styles.centeredView}>
                    <View style = {styles.modelView}>
                        <DatePicker
                            mode = 'calendar'
                            minimumDate = {startDate}
                            selected = {selectedOption === 'Set openinig date' ? closingDate : openingDate}
                            onDateChange = {changeDate}
                        />

                        <TouchableOpacity>
                            <Text onPress= {() => setViewCalenderState(!viewCalender)}>Done</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                
            </Modal>   
        </View>
    )
};

export default DropDown;