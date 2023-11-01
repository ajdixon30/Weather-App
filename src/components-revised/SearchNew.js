import React from "react";
import codes from "../country-codes.json"
import { findForecast } from "../actions/actions";
import { useDispatch } from "react-redux";
import { BiSearch } from "react-icons/bi";

const SearchNew = () => {
    const codesArray = Object.entries(codes[0]).sort();
    const dispatch = useDispatch();
    const handleForm = (e) => {
        e.preventDefault();
        const cityZip = e.target.cityZip.value;
        const country = e.target.countrySelect.value;
        dispatch(findForecast(cityZip, country));
        e.target.cityZip.value = "";
        e.target.countrySelect.value = "";
    }
    return (
        <div className="container text-center mb-5 col-md-8 col-lg-6">
            <form className="row justify-content-center" onSubmit={handleForm}>
                <div className="col-5">
                    <input id="city-zip" className="form-control text-success bg-success-subtle border border-success-subtle" placeholder="Enter City/Zip" name="cityZip"/>
                </div>
                <div className="col-5">
                    <select id="country-select" className="form-select text-success bg-success-subtle border border-success-subtle" name="countrySelect" placeholder="Country" aria-label="Country Selection">
                        <option value="">Select Country</option>
                        {codesArray.map((code, index) => {
                            return (<option key={index} value={code[0]}>{code[0]} - {code[1]}</option>)
                        })}  
                    </select>
                </div>
                <div className="d-grid col-2 align-items-center justify-content-center">
                    <button className="btn btn-outline-light"><BiSearch size="30px" color="#198754" strokeWidth="2"/></button>
                </div>
            </form>
        </div>
    )
}

export default SearchNew;