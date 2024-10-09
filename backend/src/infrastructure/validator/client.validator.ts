import Joi from 'joi';

export const validateClientData = (data: any) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(100).required().messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.',
      'string.max': 'El nombre no puede tener más de 100 caracteres.',
      'any.required': 'El nombre es obligatorio.'
    }),
    estado: Joi.string().valid('Contacto Inicial', 'En Progreso', 'Cerrado').required().messages({
      'any.only': 'El estado debe ser uno de los siguientes: Contacto Inicial, En Progreso, Cerrado.',
      'any.required': 'El estado es obligatorio.'
    }),
    prioridad: Joi.string().valid('alta', 'media', 'baja').required().messages({
      'any.only': 'La prioridad debe ser alta, media o baja.',
      'any.required': 'La prioridad es obligatoria.'
    }),
    valor_estimado: Joi.number().positive().required().messages({
      'number.base': 'El valor estimado debe ser un número.',
      'number.positive': 'El valor estimado debe ser un número positivo.',
      'any.required': 'El valor estimado es obligatorio.'
    }),
    encargado: Joi.string().min(3).max(100).required().messages({
      'string.base': 'El encargado debe ser un texto.',
      'string.min': 'El encargado debe tener al menos 3 caracteres.',
      'string.max': 'El encargado no puede tener más de 100 caracteres.',
      'any.required': 'El encargado es obligatorio.'
    }),
    origen: Joi.string().valid('contacto directo', 'referencia', 'campaña marketing', 'otro').required().messages({
      'any.only': 'El origen debe ser uno de los siguientes: contacto directo, referencia, campaña marketing, otro.',
      'any.required': 'El origen es obligatorio.'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'El email debe ser un correo electrónico válido.',
      'any.required': 'El email es obligatorio.'
    }),
    telefono: Joi.string().pattern(/^[+][0-9]{1,3}[0-9]{9,15}$/).required().messages({
      'string.pattern.base': 'El teléfono debe estar en formato internacional, comenzando con un "+" y seguido de entre 9 y 15 dígitos.',
      'any.required': 'El teléfono es obligatorio.'
    }),
    ultimo_contacto: Joi.date().iso().required().messages({
      'date.base': 'La fecha de último contacto debe ser una fecha válida.',
      'date.format': 'La fecha de último contacto debe estar en formato ISO.',
      'any.required': 'La fecha de último contacto es obligatoria.'
    }),
    expected_close: Joi.date().iso().greater('now').required().messages({
      'date.base': 'La fecha de cierre estimada debe ser una fecha válida.',
      'date.format': 'La fecha de cierre estimada debe estar en formato ISO.',
      'date.greater': 'La fecha de cierre estimada debe ser posterior a la fecha actual.',
      'any.required': 'La fecha de cierre estimada es obligatoria.'
    })
  });

  return schema.validate(data);
};
