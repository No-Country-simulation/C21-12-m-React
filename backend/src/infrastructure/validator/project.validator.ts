import Joi from 'joi';

export const validateProjectData = (data: any) => {
  const schema = Joi.object({
    clienteId: Joi.number().integer().positive().required().messages({
      'number.base': 'El ID del cliente debe ser un número.',
      'number.integer': 'El ID del cliente debe ser un número entero.',
      'number.positive': 'El ID del cliente debe ser un número positivo.',
      'any.required': 'El ID del cliente es obligatorio.'
    }),
    nombre: Joi.string().min(3).max(100).required().messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.min': 'El nombre debe tener al menos 3 caracteres.',
      'string.max': 'El nombre no puede tener más de 100 caracteres.',
      'any.required': 'El nombre es obligatorio.'
    }),
    descripcion: Joi.string().min(10).max(500).required().messages({
      'string.base': 'La descripción debe ser un texto.',
      'string.min': 'La descripción debe tener al menos 10 caracteres.',
      'string.max': 'La descripción no puede tener más de 500 caracteres.',
      'any.required': 'La descripción es obligatoria.'
    }),
    valor: Joi.number().positive().required().messages({
      'number.base': 'El valor debe ser un número.',
      'number.positive': 'El valor debe ser un número positivo.',
      'any.required': 'El valor es obligatorio.'
    }),
    estado: Joi.string().valid('PAUSADO', 'Activo', 'Completo','Cerrado').required().messages({
      'any.only': 'El estado debe ser uno de los siguientes: Pausado, Activo, Completo, Finalizado.',
      'any.required': 'El estado es obligatorio.'
    }),
    fechaInicio: Joi.date().iso().required().messages({
      'date.base': 'La fecha de inicio debe ser una fecha válida.',
      'date.iso': 'La fecha de inicio debe estar en formato ISO.',
      'any.required': 'La fecha de inicio es obligatoria.'
    }),
    fechaCierreEstimada: Joi.date().iso().greater(Joi.ref('fechaInicio')).required().messages({
      'date.base': 'La fecha de cierre estimada debe ser una fecha válida.',
      'date.iso': 'La fecha de cierre estimada debe estar en formato ISO.',
      'date.greater': 'La fecha de cierre estimada debe ser posterior a la fecha de inicio.',
      'any.required': 'La fecha de cierre estimada es obligatoria.'
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
