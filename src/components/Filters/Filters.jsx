import React, { useState } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

const Filters = ({ onFilterChange }) => {
    const [dateRange, setDateRange] = useState({ start: "", end: "" });
    const [region, setRegion] = useState("");

    const handleDateChange = (field, value) => {
        setDateRange({ ...dateRange, [field]: value });
        onFilterChange({ dateRange, region });
    };

    const handleRegionChange = (value) => {
        setRegion(value);
        onFilterChange({ dateRange, region: value });
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={dateRange.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    value={dateRange.end}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <TextField
                    label="Region"
                    select
                    fullWidth
                    value={region}
                    onChange={(e) => handleRegionChange(e.target.value)}
                >
                    {[
                        "North",
                        "South",
                        "East",
                        "West",
                    ].map((region) => (
                        <MenuItem key={region} value={region}>
                            {region}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    );
};

export default Filters;
