var data = new Vue({

	el : "#app",

	data : {
		
		ws_peak : 4.30,
		pw_peak : 4.61,
		wind_rpm : 264,

		motor_spec : {
			rpm  : 2400,
			volt : 24,
			amp  : 250
		},

		input_data : {
			kec_angin : '',
			rpm_angin : '',
			btry      : '',
			turbin    : 1,
			btry_qty  : 1
		},

		output_data : {
			arus : '',
			output_qty : 1
		}

	},

	methods : {
			
		calculateData : function (index) {

			var data = 0;

			if (index == 1) {
				data = this.input_data.kec_angin * (this.pw_peak / this.ws_peak);
			}
			else if(index == 2){
				data = this.input_data.rpm_angin * (this.pw_peak * 100 / this.wind_rpm) * 0.01;
			}

			return data.toFixed(2);
			
		},

		calculateDuration : function(index){
			
			var data = 0;

			//CHARGE TIME
			if (index == 1) {
				data = this.input_data.btry / ((10.4166666667 * this.input_data.turbin) * this.calculateData(1));				
			}

			return data.toFixed(2);

		},

		calculateOutput : function(index){

			var data = 0;
			var beban = this.input_data.btry * this.input_data.btry_qty;
			var beban_bersih = beban - (540 * this.input_data.btry_qty);

			if (index == 1) {
				data = beban_bersih / (this.output_data.arus * this.output_data.btry_qty);
			}

			return data;

		}

	}

});