import React, { useState } from 'react';
import { Vega } from 'react-vega';

const MyComponent = () => {
    const [selectedPoint, setSelectedPoint] = useState(null);

    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "description": "A simple scatter plot with selection",
        "data": {
            "values": [
                {"a": "A", "b": 28}, {"a": "B", "b": 55}, {"a": "C", "b": 43},
                {"a": "D", "b": 91}, {"a": "E", "b": 81}, {"a": "F", "b": 53},
                {"a": "G", "b": 19}, {"a": "H", "b": 87}, {"a": "I", "b": 52}
            ]
        },
        "mark": "point",
        "encoding": {
            "x": {"field": "a", "type": "ordinal"},
            "y": {"field": "b", "type": "quantitative"},
            "color": {
                "condition": {
                    "selection": "pointSelection",
                    "field": "a",
                    "type": "ordinal"
                },
                "value": "grey"
            }
        },
        "selection": {
            "pointSelection": {"type": "single", "on": "click"}
        }
    };

    const handleSelection = (event, item) => {
        if (item) {
            // Get details of the selected point
            const { a, b } = item.datum;
            setSelectedPoint({ a, b });
        } else {
            // Clear selected point details if no point is selected
            setSelectedPoint(null);
        }
    };

    return (
        <div>
            <Vega spec={spec} onSignalHover={handleSelection} />
            {selectedPoint && (
                <div>
                    <h3>Selected Point Details</h3>
                    <p>A: {selectedPoint.a}</p>
                    <p>B: {selectedPoint.b}</p>
                </div>
            )}
        </div>
    );
};

export default MyComponent;