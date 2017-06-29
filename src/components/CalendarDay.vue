<template>
    <div :class="classObject" @click="captureClick">
        {{ day.format('D') }}
        <ul class="event-list">
            <li v-for="event in events">{{ event.description }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['day'],
        computed: {
            events(){
                return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'))
            },
            classObject(){
                return {
                    day: true,
                    today: this.isToday(),
                    past: this.isBeforeToday(),
                    active: this.isEventFormDay()
                };
            }
        },
        methods: {
            isToday(){
                return this.day.isSame(this.$moment(), 'day');
            },
            isBeforeToday(){
                return this.day.isSameOrBefore(this.$moment(), 'day') && !this.isToday();
            },
            isEventFormDay(){
                let eventFormDate = this.$store.state.eventFormDate;
                let eventFormActive = this.$store.state.eventFormActive;
                return eventFormDate.isSame(this.day, 'day') && eventFormActive;
            },
            captureClick(event){
                this.$store.commit('eventFormPos', {x: event.clientX, y: event.clientY});
                this.$store.commit('eventFormActive', true);
                this.$store.commit('eventFormDate', this.day);
            }
        }
    }
</script>