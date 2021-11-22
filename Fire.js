import firebase from 'firebase'
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "55456XFGdsSFXS-SD3SoDVP1iHGGGFjPYLNw-4",
    authDomain: "myprojects-root.firebaseapp.com",
    databaseURL: "https://myprojects-root.firebaseio.com",
    projectId: "myprojects-root",
    storageBucket: "myprojects-root.appspot.com",
    messagingSenderId: "899208437002",
    appId: "1:899208437002:web:ceb60a6dc10d386fe92ef3"
}

class Fire {

    constructor(callback) {
        this.init(callback)
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user)

            } else {
                firebase.auth().signInAnonymously().catch(eror => {
                    callback(error)
                })
            }


        })


    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() })
            })
            callback(lists)
        })
    }

    addList(list){
        let ref = this.ref;
        ref.add(list)
    }

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list)
    }
    deleteList(list){
        let ref = this.ref;
        ref.doc(list.id).delete()
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref(){
        return firebase
        .firestore()
        .collection("users")
        .doc(this.userId)
        .collection("lists")
    }

    detach(){
        this.unsubscribe();
    }
}

export default Fire;