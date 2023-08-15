import {Form, Field} from "react-final-form";
import "./styles.css";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {format} from 'date-fns'
import {OnChange} from "react-final-form-listeners";
import Select from "react-select";


const Formular = () => {

    const onSubmit = (e) => {
        console.log(e);
        debugger;
    }

    const footballLeague = [
        {value: "Premier League", label: "Premier League"},
        {value: "Fortuna Liga", label: "Fortuna Liga"}
    ]
    const premierLeagueTeams = [
        {value: "Arsenal", label: "Arsenal"},
        {value: "Chelsea", label: "Chelsea"},
        {value: "Everton", label: "Everton"},
        {value: "Liverpool", label: "Liverpool"},
        {value: "Manchester City", label: "Manchester City"},
        {value: "Tottemham hotspur", label: "Tottemham hotspur"}
    ]
    const fortunaLeagueTeams = [
        {value: "Slavia", label: "Slavia"},
        {value: "Plzeň", label: "Plzeň"},
        {value: "Sparta", label: "Sparta"},
        {value: "HR. Králové", label: "HR. Králové"},
        {value: "Olomouc", label: "Olomouc"},
        {value: "Bohemians", label: "Bohemians"}
    ]

    const style = {
        control: base => ({
            ...base,
            border: "3px solid red"
            // This line disable the blue border

        })
    };



    return (
        <div>
            <Form onSubmit={onSubmit}
                  validate={values => {
                      const errors = {};

                      if (!values.firstname) {
                          errors.firstname = "chybí jméno"
                      }
                      if (!values.surname) {
                          errors.surname = "chybí příjmení"
                      }
                      if (!values.email) {
                          errors.email = "chybí email"
                      }
                      if (!values.bornDate) {
                          errors.bornDate = "chybí datum narození"
                      }
                      if (!values.favouriteLeague) {
                          errors.favouriteLeague = "chybí LIGA"
                      }
                      if (!values.favouriteTeam){
                          errors.favouriteTeam = "chybí TEAM"
                      }

                      console.log("ERRORS: ",errors);

                      return errors;
                  }}
                  render={({handleSubmit, form, submitting, values, touched}) => (

                      <form onSubmit={handleSubmit}>

                          <Field name="firstname">
                              {({input, meta}) => (
                                  <div className={"field"}>
                                      <label>Jméno:</label>
                                      <input {...input} type="text"
                                             className={(meta.error && meta.touched) ? "cervenejInput" : null}
                                             placeholder="Jméno"/>
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}
                          </Field>

                          <Field name="surname">
                              {({input, meta}) => (
                                  <div className={"field"}>
                                      <label>Příjmení:</label>
                                      <input {...input} type="text"
                                             className={(meta.error && meta.touched) ? "cervenejInput" : null}
                                             placeholder="Příjmení"/>
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}
                          </Field>

                          <Field name="email">
                              {({input, meta}) => (
                                  <div className={"field"}>
                                      <label>Email:</label>
                                      <input {...input} type="email"
                                             className={(meta.error && meta.touched) ? "cervenejInput" : null}
                                             placeholder="Email"/>
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}
                          </Field>

                          <Field name="bornDate" format={value => {
                              /* console.log("FORMAT", value)*/
                              if (!value) return undefined
                              let date = new Date();
                              let split = value.split(".")
                              /*console.log(split)*/
                              date.setDate(split[0])
                              date.setMonth(parseInt(split[1]) - 1)
                              date.setFullYear(split[2])
                              return date;
                          }} parse={value => {
                              //console.log(value)
                              //console.log("PARSE VALUE", format(value, "d.M.yyyy"))
                              return format(value, "d.M.yyyy")
                          }}>
                              {({input, meta}) => {
                                  //console.log("VALUE", input.value)
                                  return (
                                      <div className={"field"}>
                                          <label className={"labelComp"}>
                                              Datum narození:
                                          </label>
                                          <div>
                                              <DatePicker {...input}
                                                          selected={input.value}
                                                          dateFormat={"dd.MM.yyyy"}
                                                          onChange={(date) => input.onChange(date)}
                                                          maxDate={new Date()}
                                                          minDate={new Date("20.10.1900")}
                                                          placeholderText={"Datum narození"}
                                                          autoComplete={"off"}
                                                          className={(meta.error && meta.touched) ? "cervenejInput" : null}

                                              />

                                          </div>
                                          {meta.error && meta.touched && <span>{meta.error}</span>}
                                      </div>
                                  )
                              }}
                          </Field>

                          <Field name="age" component={"input"}>
                              {({input}) => (
                                  <div className={"field"}>
                                      <label>Věk: </label>
                                      <input {...input}
                                             type="number"
                                             placeholder="-"
                                             disabled={true}
                                      />
                                  </div>
                              )}
                          </Field>

                          <OnChange name={"bornDate"}>
                              {(value) => {
                                  //console.log("VALUE IS :", value)
                                  let date = new Date()
                                  //console.log("VALUE OF DATE IS: ", date)
                                  let split = value.split(".")
                                  //console.log(split)
                                  date.setDate(split[0])
                                  date.setMonth(parseInt(split[1]) - 1)
                                  date.setFullYear(split[2])
                                  //console.log("VALUE OF NEW DATE IS: ", date)
                                  let ageDt = new Date(Date.now() - date.getTime());
                                  let age = Math.abs((ageDt.getUTCFullYear()) - 1970);
                                  //console.log("VEK JE: ", age)
                                  form.change("age", age)
                              }}
                          </OnChange>

                          <Field name={"favouriteLeague"}
                                 format={(value) =>{
                                     console.log("*-value: ", value)
                                     console.log("*-values.footballLeague: ", values.footballLeague)
                                     if (!value)
                                         return undefined;
                                     return footballLeague.find(item => item.value === value)
                                 }}
                                 parse={(value) => {
                                     console.log("-Parsing favouriteLeague: ", value);
                                     if (!value) return null
                                     return value.value;
                                 }}>
                              {({input, meta}) => {
                                  return (
                                      <div className={"field"}>
                                          <label className={"labelComp"}>
                                              Fotbalová liga:
                                              <Select {...input}
                                                      className={"basic-single"}
                                                      classNamePrefix={"select"}
                                                      name={"Football Leagues"}
                                                      options={footballLeague}
                                                      placeholder={"Oblíbená fotbalová liga"}
                                                      value={input.value ? input.value : null}
                                                      styles={(meta.error && meta.touched) && style}
                                                      onChange={(value) => {
                                                          input.onChange(value)
                                                      }}
                                              />
                                              {console.log("---------input: ", input)}
                                          </label>
                                      </div>
                                  )
                              }}
                          </Field>

                          <Field name={"favouriteTeam"}
                                 parse={value => {
                                     console.log("--Parsing favouriteTeam", value)
                                     if (!value) return null
                                     return value.value
                                 }}
                                 format={(value) => {
                                     /*console.log("-FormatTeam-", value)*/
                                     if (!value) return undefined
                                     if (values.favouriteLeague === "Premier League") {
                                         return premierLeagueTeams.find(item => item.value === value)
                                     } else {
                                         return fortunaLeagueTeams.find(item => item.value === value)
                                     }
                                 }}
                          >
                              {({input, meta}) => {
                                  /* console.log("CURRENT", input.value)*/
                                  return (
                                      <div className={"field"}>
                                          <label className={"labelComp"}>
                                              Fotbalové týmy:
                                              <Select {...input}
                                                      className={"basic-single"}
                                                      classNamePrefix={"select"}
                                                      name={"Football Teams"}
                                                      isClearable={true}
                                                      options={(values.favouriteLeague === "Premier League") ? premierLeagueTeams : fortunaLeagueTeams}
                                                      placeholder={"Oblíbený fotbalový team"}
                                                      value={input.value ? input.value : null}
                                                      styles={(meta.error && meta.touched) && style}
                                                      onChange={(value) => {
                                                          input.onChange(value)
                                                      }}
                                                      isDisabled={!values.favouriteLeague}
                                              ></Select>
                                          </label>
                                      </div>
                                  )
                              }}
                          </Field>

                          <OnChange name={"favouriteLeague"}>
                              {() => {
                                  if (values.favouriteTeam) {
                                      console.log("change")
                                      form.change("favouriteTeam", null)
                                  }
                              }}
                          </OnChange>

                          <div className={"btn"}>
                              <button type={"submit"} disabled={submitting}>Odeslat</button>
                          </div>

                          <pre>{JSON.stringify(values, undefined, 2)}</pre>
                      </form>
                  )}/>
        </div>
    )
}

export default Formular;