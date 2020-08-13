$(document).ready(function() {
    $('#divTabsPrincipal').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

				/*Solamente tiene que un fields para llamar todas las validaciones
				* notEmpty: cuando el texto esta vacio
				*stringLength: lo campos minimos
				* regexp: /^[a-z\s]+$/i, solamente letras y espacios.
				*/
        fields: {
            Nombre_Alumno: {
                validators: {
									notEmpty: {

				 					 message: 'Es requerido el campo.'

				 				 },
								 stringLength: {
									min: 4,
									message: 'El nombre debe contener al menos 4 caracteres.'

								},
                    regexp: {
                        regexp: /^[a-z\s]+$/i,
                        message: 'El nombre completo puede constar de caracteres alfabéticos y espacios solamente.'
                    }


                }
            },
						ApellidoPaterno_Alumno: {
                validators: {
									notEmpty: {

				 					 message: 'Es requerido el campo.'

				 				 },
								 stringLength: {
									min: 4,
									message: 'El apellido paterno debe contener al menos 4 caracteres.'

								},
                    regexp: {
                        regexp: /^[a-z\s]+$/i,
                        message: 'El apellido paterno completo puede constar de caracteres alfabéticos y espacios solamente.'
                    }


                }

							},
							ApellidoMaterno_Alumno: {
	                validators: {
										notEmpty: {

					 					 message: 'Es requerido el campo.'

					 				 },
									 stringLength: {
										min: 4,
										message: 'El apellido materno debe contener al menos 4 caracteres.'

									},
	                    regexp: {
	                        regexp: /^[a-z\s]+$/i,
	                        message: 'El apellido materno completo puede constar de caracteres alfabéticos y espacios solamente.'
	                    }


	                }

								},
								Matricula_Alumno: {
		                validators: {
											notEmpty: {

						 					 message: 'Es requerido el campo.'

						 				 },
										 stringLength: {
											min: 8,
											message: 'La matricula debe contener al menos 8 caracteres.'

										},
		                    regexp: {
		                        regexp: /^[0-9]+$/,
		                        message: 'La matricula solo puede tener numeros.'
		                    }


		                }

									},
									/*	va en el input del html
									 pattern="^(09|1[0-7]{1}):[0-5]{1}[0-9]{1}$"
									 data-bv-regexp-message="The meeting time must be between 09:00 and 17:59"*/
									Horario_Servicio_Alumno: {
			                validators: {
												notEmpty: {

							 					 message: 'Es requerido el campo.'

							 				 },
											 stringLength: {
												min: 12,
												message: 'El horario debe contener al menos 12 caracteres.'

											},



			                }

										},
										Telefono_Casa_Alumno: {
				                validators: {
													notEmpty: {

								 					 message: 'Es requerido el campo.'

								 				 },
												 stringLength: {
													min: 8,
													message: 'El telefono debe contener al menos 8 caracteres.'

												},
				                    regexp: {
				                        regexp: /^[0-9]+$/,
				                        message: 'La telefono solo puede tener numeros.'
				                    }


				                }

											},
											Telefono_Celular_Alumno: {
					                validators: {
														notEmpty: {

									 					 message: 'Es requerido el campo.'

									 				 },
													 stringLength: {
														min: 8,
														message: 'El telefono celular debe contener al menos 10 caracteres.'

													},
					                    regexp: {
					                        regexp: /^[0-9]+$/,
					                        message: 'El telefono celular solo puede tener numeros.'
					                    }


					                }

												},
												Domicilio_Alumno: {
														validators: {
															notEmpty: {

															 message: 'Es requerido el campo.'

														 },
														 stringLength: {
															min: 15,
															message: 'El domicilio debe contener al menos 15 caracteres.'

														},



														}

													},
													Curp_Alumno: {
															validators: {
																notEmpty: {

																 message: 'Es requerido el campo.'

															 },
															 stringLength: {
																min: 18,
																message: 'El CURP debe contener al menos 18 caracteres.'

															},



															}

														},
														RFC_Alumno: {
																validators: {
																	notEmpty: {

																	 message: 'Es requerido el campo.'

																 },
																 stringLength: {
																	min: 12,
																	message: 'El RFC debe contener al menos 12 caracteres.'

																},



																}

															},


        }

    });
});
