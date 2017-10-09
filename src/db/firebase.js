import firebase from "firebase";

const config = {
	apiKey: "AIzaSyBpUtei1at5viWICyekxBFeBEB9oMhtc8o",
	authDomain: "beezer-test-d0504.firebaseapp.com",
	databaseURL: "https://beezer-test-d0504.firebaseio.com",
	projectId: "beezer-test-d0504",
	storageBucket: "",
	messagingSenderId: "395460589516"
	};
firebase.initializeApp(config);
const db = firebase.database();

export default db;