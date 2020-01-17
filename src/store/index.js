import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '../db'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    heros:[]
  },

  mutations: vuexfireMutations,

  actions: {
    bindHeros: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('heros', db.collection('heros'))
    }),
  },
})
