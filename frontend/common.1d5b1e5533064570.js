"use strict";(self.webpackChunkrawncafe_web=self.webpackChunkrawncafe_web||[]).push([[592],{373:(i,n,s)=>{s.d(n,{y:()=>l});var e=s(2340),a=s(4893),o=s(520);let l=(()=>{class r{constructor(t){this.http=t}getUserDetails(t){return this.http.get(`${e.N.apiUrl}/users/${t}`)}addRewardToUser(t,_){return this.http.post(`${e.N.apiUrl}/users/${t}/redeem/${_}`,{})}getAllRewards(){return this.http.get(`${e.N.apiUrl}/rewards`)}addPoints(t){return this.http.post(`${e.N.apiUrl}/users/update-points`,{userId:t})}getAllUsers(){return this.http.get(`${e.N.apiUrl}/users`)}}return r.\u0275fac=function(t){return new(t||r)(a.LFG(o.eN))},r.\u0275prov=a.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()}}]);