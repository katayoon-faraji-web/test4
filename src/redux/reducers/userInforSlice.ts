import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

interface StateType {
    phone:string
    phone_number:string
    first_name:string
    last_name:string
    agent_code:string
    agency_type:string
    province:string
    province_id:string
    county:string
    address:string
    city_code:string
    insurance_branch:string
    Name?:string|null
    OTP:string
    cities:{name:string,fanavaran_code:number}[]

}


const initialState: StateType = {
    cities:[{name:'',fanavaran_code:0}],
    phone:'',
    phone_number:'',
    first_name:'',
    last_name:'',
    agent_code:'',
    agency_type:'real',
    province:'',
    province_id:'',
    county:'',
    address:'',
    city_code:'0',
    insurance_branch:'',
    Name:'',
    OTP:'',
}

const userInforSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserPhoneNumber:(state,action:PayloadAction<string>)=>{
        state.phone_number = action.payload
    },
    setOTP:(state,action:PayloadAction<string>)=>{
      state.OTP = action.payload
    },
    setFirstName:(state,action:PayloadAction<string>)=>{
      state.first_name = action.payload
    },
    setLastName:(state,action:PayloadAction<string>)=>{
      state.last_name = action.payload
    },
    setAgentCode:(state,action:PayloadAction<string>)=>{
      state.agent_code = action.payload
    },
    setProvinceName:(state,action:PayloadAction<string>)=>{
      state.province = action.payload
    },
    setProvinceId:(state,action:PayloadAction<string>)=>{
      state.province_id = action.payload
    },
    setCityName:(state,action:PayloadAction<string>)=>{
      state.county = action.payload
    },
    setInsuranceBranch:(state,action:PayloadAction<string>)=>{
      state.insurance_branch = action.payload
    },
    setAddress:(state,action:PayloadAction<string>)=>{
      state.address = action.payload
    },
    setCityCode:(state,action:PayloadAction<string>)=>{
      state.address = action.payload
    },
    setPhone:(state,action:PayloadAction<string>)=>{
      state.phone = action.payload
    
    },
    setAgencyType:(state,action:PayloadAction<string>)=>{
      state.agency_type = action.payload
    },
    setAgentName:(state,action:PayloadAction<string>)=>{
      state.Name = action.payload
    },
    
  },

  
  

})

// custom selectors
export const selectCurrentUser = (state: RootState) => state.userInfo

export const {setAgentCode, setUserPhoneNumber,setOTP,setFirstName,setLastName,setProvinceName,setProvinceId,setCityName,setCityCode,setInsuranceBranch,setAddress,setPhone,setAgencyType,setAgentName } = userInforSlice.actions

export default userInforSlice.reducer
