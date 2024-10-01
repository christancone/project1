import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextFieldOutlined from './TextFieldOutlined';
import CheckboxList from './CheckboxList.jsx';
import IconLabelButtons from './IconLabelButtons.jsx';

function Dining() {
    const [fromTime, setFromTime] = useState(null);
    const [toTime, setToTime] = useState(null);
    const [notes, setNotes] = useState('');
    const [checked, setChecked] = useState([]);
    const [children, setChildren] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const response = await axios.get('http://localhost/backend/Christan/fetch_children_list.php');

                // Assuming your response looks like { "status": "success", "children": [...] }
                if (response.data.status === 'success') {
                    setChildren(response.data.children); // Set the children array
                } else {
                    setError('No children found.');
                }
            } catch (error) {
                setError('Error fetching child data.');
            }
        };

        fetchChildren();
    }, []);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleSubmit = async () => {
        const dataToSend = {
            fromTime,
            toTime,
            notes,
            children: checked,
        };

        console.log('Data to be sent:', JSON.stringify(dataToSend, null, 2));

        try {
            await axios.post('http://localhost/backend/Christan/process_dining.php', dataToSend);
            console.log('Data submitted successfully');
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div style={{ backgroundColor: '#f4f6f8', height: '100%' }}>
            <TextFieldOutlined
                fromTime={fromTime}
                toTime={toTime}
                notes={notes}
                handleFromTimeChange={setFromTime}
                handleToTimeChange={setToTime}
                handleNotesChange={setNotes}
            />
            <CheckboxList
                checked={checked}
                handleToggle={handleToggle}
                children={children} // Pass children array correctly
                error={error}
            />
            <IconLabelButtons onClick={handleSubmit} />
        </div>
    );
}

export default Dining;
