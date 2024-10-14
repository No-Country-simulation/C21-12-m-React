import Joi from 'joi';

export const validateActivitieData = (data: any) => {
  const schema = Joi.object({
    clienteId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del cliente debe ser un número.',
      'number.integer': 'El ID del cliente debe ser un número entero.',
      'number.positive': 'El ID del cliente debe ser un número positivo.',
      'any.required': 'El ID del cliente es obligatorio.'
    }),
    proyectoId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del proyecto debe ser un número.',
      'number.integer': 'El ID del proyecto debe ser un número entero.',
      'number.positive': 'El ID del proyecto debe ser un número positivo.',
      'any.required': 'El ID del proyecto es obligatorio.'
    }),
    fecha: Joi.date().iso().required().messages({
      'date.base': 'La fecha debe ser una fecha válida.',
      'date.iso': 'La fecha debe estar en formato ISO.',
      'any.required': 'La fecha es obligatoria.'
    }),
    tipo: Joi.string().valid('LLAMADA', 'REUNION', 'EMAIL', 'OTRO').required().messages({
      'any.only': 'El tipo de actividad debe ser uno de los siguientes: LLAMADA, REUNION, EMAIL, OTRO.',
      'any.required': 'El tipo de actividad es obligatorio.'
    }),
    descripcion: Joi.string().min(10).max(500).required().messages({
      'string.base': 'La descripción debe ser un texto.',
      'string.min': 'La descripción debe tener al menos 10 caracteres.',
      'string.max': 'La descripción no puede tener más de 500 caracteres.',
      'any.required': 'La descripción es obligatoria.'
    }),
    responsableId: Joi.string().min(3).max(100).required().messages({
      'string.base': 'El ID del responsable debe ser un texto.',
      'string.min': 'El ID del responsable debe tener al menos 3 caracteres.',
      'string.max': 'El ID del responsable no puede tener más de 100 caracteres.',
      'any.required': 'El ID del responsable es obligatorio.'
    })
  });

  return schema.validate(data);
};
