//TODO should recfactor have add remove node methods and have the
// the react components add their own so they store their own refs.

let context;

let buildChannel = function() {
  var channel = {};


  var uvmeter = context.createScriptProcessor(2048, 1, 1);
  channel.uvmeter = uvmeter;
  uvmeter.connect(context.destination);

  var analyser = context.createAnalyser();
  channel.analyser = analyser;
  analyser.smoothingTimeConstant = 0.3;
  analyser.fftSize = 512;
  analyser.connect(uvmeter);


  var gain = context.createGain();
  // level always starts at 0... mixer will change when loading
  gain.gain.value = 1;
  channel.gain = gain;
  gain.connect(analyser);
  gain.connect(context.destination);


	var high = context.createBiquadFilter();
	high.type = 'highshelf';
	high.gain.value = 0;
	high.Q.value = 0.0;
	high.frequency.value = 3200;
	channel.high = high;
	high.connect(gain);


	var mid = context.createBiquadFilter();
	mid.type = 'peaking';
	mid.gain.value = 0;
	mid.Q.value = 0.5;
	mid.frequency.value = 1000;
	channel.mid = mid;
	mid.connect(high);


	var low = context.createBiquadFilter();
	low.type = 'lowshelf';
	low.gain.value = 0;
	low.Q.value = 0;
	low.frequency.value = 320;
	channel.low = low;
	low.connect(mid);

	return {root: low, channel: channel};

}

class AC {

	constructor() {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
	}

	createSource(arraybuffer, track, cb) {
		context.decodeAudioData(arraybuffer, (audiobuffer) => {
			track.buffer = audiobuffer;
			var x = buildChannel();
			track.channel = x.channel;
			track.root = x.root;
			cb(track);
		});
	}

	getContext() {
		return context;
	}

}

let instance = new AC();

export default instance;
