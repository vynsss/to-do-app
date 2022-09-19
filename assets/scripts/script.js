const app = Vue.createApp({
    data(){
        return {
            toDoInput: null,
            list: []
        }
    },
    mounted(){
        const localList = localStorage.getItem("toDoList");
        if(localList) this.list = JSON.parse(localStorage.getItem("toDoList"))
    },
    watch: {
        list: {
            handler(){
                this.onUpdate();
            },
            deep: true
        }
    },
    methods: {
        onChecked(id){
            // change the done status based on index
            this.list[id].done = !this.list[id].done;
        },
        onAdd(){
            this.list.push({
                name: this.toDoInput,
                done: false,
            })

            // reset toDoInput after the append
            this.toDoInput = null
        },
        onDelete(id){
            // delete based on index
            this.list.splice(id, 1)
        },
        onUpdate(){
            localStorage.setItem("toDoList", JSON.stringify(this.list))
        },
        // reset all the list
        onReset(){
            this.list = []
            localStorage.removeItem("toDoList")
        }
    }
})

app.mount("#app")