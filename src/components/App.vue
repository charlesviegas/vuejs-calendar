<template>
    <div>
        <div id="header">
            <div>
                <h1>Vue.js Calendar</h1>
            </div>
            <div>
                <current-month></current-month>
            </div>
        </div>
        <div id="day-bar">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
        </div>
        <div id="calendar">
            <div v-for="week in weeks" class="calendar-week">
                <calendar-day v-for="day in week" :day="day"></calendar-day>
            </div>
        </div>
        <event-form></event-form>
    </div>
</template>

<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from './EventForm.vue';
    export default {
        components: {
            CalendarDay,
            CurrentMonth,
            EventForm
        },
        computed: {
            year(){
                return this.$store.state.currentYear;
            },
            month(){
                return this.$store.state.currentMonth;
            },
            days(){
                let days = [];
                this.addEveryDayOfCurrentMonth(days);
                this.addLastDaysOfPreviousMonth(days);
                this.addFirstDaysOfNextMonth(days);
                return days;
            },
            weeks(){
                return this.breakDaysInWeeks(this.days);
            }
        },
        methods: {
            isMonday(currentDay){
                return currentDay.day() === 1
            },
            isSunday(currentDay){
                return currentDay.day() === 0
            },
            firstDayOfMonth(){
                return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').tz("UTC");
            },
            isCurrentMonth(currentDay){
                return (currentDay.month() + 1) === this.month;
            },
            addEveryDayOfCurrentMonth(days){
                let currentDay = this.firstDayOfMonth();
                do {
                    days.push(currentDay);
                    currentDay = this.$moment(currentDay).add(1, 'days');
                } while (this.isCurrentMonth(currentDay));
                return days;
            },
            addLastDaysOfPreviousMonth(days){
                let currentDay = this.$moment(days[0]);
                while (!this.isMonday(currentDay)) {
                    currentDay = this.$moment(currentDay).subtract(1, 'days');
                    days.unshift(currentDay);
                }
            },
            addFirstDaysOfNextMonth(days){
                let currentDay = this.$moment(days[days.length - 1]);
                while (!this.isSunday(currentDay)) {
                    currentDay = this.$moment(currentDay).add(1, 'days');
                    days.push(currentDay);
                }
            },
            breakDaysInWeeks(days){
                let weeks = [];
                let week = [];
                for (let day of days) {
                    week.push(day);
                    if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }
                return weeks;
            }
        }
    }
</script>