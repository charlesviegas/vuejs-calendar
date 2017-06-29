import Vue from "vue";
import Vuex from "vuex";
import moment from "moment-timezone";
import Axios from "axios";

moment.tz.setDefault('UTC');
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentYear: 2017,
        currentMonth: 6,
        eventFormPosX: 0,
        eventFormPosY: 0,
        eventFormActive: false,
        events: [
            {description: 'Randam event', date: moment('2017-06-10', 'YYYY-MM-DD')},
            {description: 'Randam event', date: moment('2017-06-12', 'YYYY-MM-DD')},
            {description: 'Randam event', date: moment('2017-06-20', 'YYYY-MM-DD')}
        ],
        eventFormDate: moment()
    },
    actions: {
        addEvent(context, payload){
            return new Promise((resolve, reject) => {
                let event = {
                    description: payload,
                    date: context.state.eventFormDate
                };
                Axios.post('/add_event', event).then(response => {
                    if (response.status === 200) {
                        context.commit('addEvent', event);
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            });

        }
    },
    mutations: {
        setCurrentMonth(state, payload){
            state.currentMonth = payload;
        },
        setCurrentYear(state, payload){
            state.currentYear = payload;
        },
        eventFormPos(state, payload){
            state.eventFormPosX = payload.x;
            state.eventFormPosY = payload.y;
        },
        eventFormActive(state, payload){
            state.eventFormActive = payload;
        },
        addEvent(state, payload){
            state.events.push(payload);
        },
        eventFormDate(state, payload){
            state.eventFormDate = payload;
        }
    }
});
