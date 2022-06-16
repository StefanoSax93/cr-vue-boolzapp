// @ts-ignore
dayjs.extend(dayjs_plugin_customParseFormat)

const contatti = [
  {
    name: "Michele",
    avatar: "_1",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Hai portato a spasso il cane?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Ricordati di stendere i panni",
        status: "sent",
      },
      {
        date: "10/01/2020 16:15:22",
        message: "Tutto fatto!",
        status: "received",
      },
    ],
  },
  {
    name: "Fabio",
    avatar: "_2",
    visible: true,
    messages: [
      {
        date: "20/03/2020 16:30:00",
        message: "Ciao come stai?",
        status: "sent",
      },
      {
        date: "20/03/2020 16:30:55",
        message: "Bene grazie! Stasera ci vediamo?",
        status: "received",
      },
      {
        date: "20/03/2020 16:35:00",
        message: "Mi piacerebbe ma devo andare a fare la spesa.",
        status: "sent",
      },
    ],
  },
  {
    name: "Samuele",
    avatar: "_3",
    visible: true,
    messages: [
      {
        date: "28/03/2020 10:10:40",
        message: "La Marianna va in campagna",
        status: "received",
      },
      {
        date: "28/03/2020 10:20:10",
        message: "Sicuro di non aver sbagliato chat?",
        status: "sent",
      },
      {
        date: "28/03/2020 16:15:22",
        message: "Ah scusa!",
        status: "received",
      },
    ],
  },
  {
    name: "Alessandro B.",
    avatar: "_4",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Lo sai che ha aperto una nuova pizzeria?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Si, ma preferirei andare al cinema",
        status: "received",
      },
    ],
  },
  {
    name: "Alessandro L.",
    avatar: "_5",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ricordati di chiamare la nonna",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Va bene, stasera la sento",
        status: "received",
      },
    ],
  },
  {
    name: "Claudia",
    avatar: "_6",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ciao Claudia, hai novità?",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Non ancora",
        status: "received",
      },
      {
        date: "10/01/2020 15:51:00",
        message: "Nessuna nuova, buona nuova",
        status: "sent",
      },
    ],
  },
  {
    name: "Federico",
    avatar: "_7",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Fai gli auguri a Martina che è il suo compleanno!",
        status: "sent",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "Grazie per avermelo ricordato, le scrivo subito!",
        status: "received",
      },
    ],
  },
  {
    name: "Davide",
    avatar: "_8",
    visible: true,
    messages: [
      {
        date: "10/01/2020 15:30:55",
        message: "Ciao, andiamo a mangiare la pizza stasera?",
        status: "received",
      },
      {
        date: "10/01/2020 15:50:00",
        message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
        status: "sent",
      },
      {
        date: "10/01/2020 15:51:00",
        message: "OK!!",
        status: "received",
      },
    ],
  },
  
];

/*
Milestone 5 - opzionale
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato.
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
*/

// @ts-ignore
const appVue = new Vue({
  el: "#app",
  data: {
    listaContatti: contatti,
    currentUser: contatti[0],
    newMessage: "",
    search: "",
    pendingResponseUser: null,
  },

  computed: {
    filteredList() {
      return this.listaContatti.filter(contatto => {
        return contatto.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },

  methods: {
    changeUser(contatto) {
      this.currentUser = contatto;
    },

    getStatus(status) {
      if (status === "sent") {
        return true;
      }
    },
    
    addMessage() {
      if(this.newMessage) {
        this.currentUser.messages.push({
          // @ts-ignore
          date: dayjs(),
          message: this.newMessage,
          status: "sent",
        });
        this.newMessage = "";
      
      
        this.pendingResponseUser = this.currentUser;

        setTimeout(() => {
          this.pendingResponseUser.messages.push({
            // @ts-ignore
            date: dayjs(),
            message: "Ok",
            status: "received",
          });
          this.pendingResponseUser = null;  
        }, 1000);
      }
    },
    // creo una funzione per ottenere l'ultimo messaggio ricevuto
    getLastMessage(contatto) {
      return contatto.messages[contatto.messages.length - 1].message;
    },
    //creo una funzione per ottenere l'ora dell'ultimo messaggio ricevuto
    getLastMessageTime(contatto) {
      let lastMessageTime= contatto.messages[contatto.messages.length - 1].date;
      return dayjs(lastMessageTime,"DD/MM/YYYY HH:mm").format("HH:mm");
    },
    //creo una funzione per formattare l'ora dell'ultimo messaggio ricevuto
    formatTime(i) {
      let dataFormattata= dayjs(this.currentUser.messages[i].date,"DD/MM/YYYY HH:mm").format("HH:mm");
      return dataFormattata;
    },
    //creo una funzione per cancellare il messaggio clicckato
    deleteMessage(i) {
      this.currentUser.messages.splice(i, 1);
    }
  },
});
// @ts-ignore
console.log(dayjs().format("DD/MM/YYYY"));