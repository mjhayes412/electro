import Dispatcher from '../dispatcher/Dispatcher.js';
import yt from '../utils/yt.js';

class Tracks {

	addTrack(track) {
		yt.download(track);
		//TODO temp until search
		track.thumbnail = 'http://lorempixel.com/300/300/';
		Dispatcher.dispatch({
			type: 'update_track',
			track: track
		});
	}

	updateTrack(track){
		Dispatcher.dispatch({
			type: 'update_track',
			track: track
		});
	}

	removeTrack(track){
		Dispatcher.dispatch({
			type: 'remove_track',
			track: track
		});
	}



}

const instance = new Tracks();

export default instance;
