$('#divTabsPrincipal').bootstrapValidator({

	 message: 'Este valor no es valido',

	 feedbackIcons: {

		 valid: 'glyphicon glyphicon',

		 invalid: 'glyphicon glyphicon',

		 validating: 'glyphicon glyphicon-refresh'

	 },

	 fields: {

		nombre: {

			 validators: {

				 notEmpty: {

					 message: 'Es requerido el campo'

				 },

				 regexp: {

					 regexp: /^[A-Z,a-z ]+$/,

					 message: 'El campo solo puede contener letras'

				 }

			 },

		 },

		 curp: {

			 validators: {

				 notEmpty: {

					 message: 'El curp es requerido'

				 }

			 }

		 },

		 email: {

			 validators: {

				 notEmpty: {

					 message: 'El correo es requerido y no puede ser vacio'

				 },

				 emailAddress: {

					 message: 'El correo electronico no es valido'

				 }

			 }

		 },

		 telefono: {

			 message: 'El teléfono no es valido',

			 validators: {

				 notEmpty: {

					 message: 'El teléfono es requerido y no puede ser vacio'

				 },

				 regexp: {

					 regexp: /^[0-9]+$/,

					 message: 'El teléfono solo puede contener números'

				 }

			 }

		 },

		 status: {

			 message: 'El teléfono no es valido',

			 validators: {

				 notEmpty: {

					 message: 'El estatus es requerido y no puede ser vacio'

				 },

				 regexp: {

					 regexp: /^[0-9]+$/,

					 message: 'El estatus solo puede contener un numero'

				 }

			 }

		 },

		 direccion: {

			 validators: {

				 notEmpty: {

					 message: 'La direccion de usuario es requerido'

				 }

			 }

		 },

		 habilidades: {

			 validators: {

				 notEmpty: {

					 message: 'Las habilidades son requeridas'

				 }

			 }

		 },

		 experiencia: {

			 validators: {

				 notEmpty: {

					 message: 'Las expericnia laboral son requeridas'

				 }

			 }

		 },

		 password: {

			 validators: {

				 notEmpty: {

					 message: 'El password es requerido y no puede ser vacio'

				 },

				 stringLength: {

					 min: 8,

					 message: 'El password debe contener al menos 8 caracteres'

				 }

			 }

		 },

		 skype: {

			 validators: {

				 notEmpty: {

					 message: 'El curp es requerido'

				 }

			 }

		 }

	 }

});
