import React, { useState } from "react";
import countries from "i18n-iso-countries";
import esLocale from "i18n-iso-countries/langs/es.json";
import { Select, MenuItem } from "@mui/material";

export default function CountrySelector({ ...rest }) {
  countries.registerLocale(esLocale);

  const countryObj = countries.getNames("es", { select: "official" });

  const countryArray = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  return (
    <Select {...rest}>
      {countryArray.map(({ label, value }) => (
        <MenuItem key={value} value={label}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
}
