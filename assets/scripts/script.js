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
    methods: {
        onChecked(id){
            // change the done status based on index
            this.list[id].done = !this.list[id].done;
            this.onUpdate();
        },
        onAdd(){
            this.list.push({
                name: this.toDoInput,
                done: false,
            })

            // reset toDoInput after the append
            this.toDoInput = null
            this.onUpdate();
        },
        onDelete(id){
            // delete based on index
            this.list.splice(id, 1)
            this.onUpdate();
        },
        // should have been able to be called on watch but there's a problem
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