
package br.com.orlandoburli.seguranca.core.utils;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.apache.log4j.Logger;

public class ReflectionUtils {

	private final static Logger log = Logger.getLogger(ReflectionUtils.class.getName());

	/**
	 * Retorna uma nova instancia da classe
	 *
	 * @param clazz
	 *            Classe a ser instanciada
	 * @return Objeto instanciado, se houver construtor padrao.
	 */
	public static Object newInstance(Class<?> clazz) {
		try {
			return clazz.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			log.fatal(e);
		}
		return null;
	}

	/**
	 * Retorna o metodo getter de um atributo.
	 *
	 * @param classe
	 *            Classe do objeto
	 * @param f
	 *            Field que se quer o getter
	 * @return Objeto Method (java.lang.reflect)
	 */
	public static Method getGetterMethod(Class<?> classe, Field f) {
		String fieldName = f.getName();
		String methodName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);

		try {
			return classe.getMethod(methodName, new Class[] {});
		} catch (NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static Method getGetterMethod(Class<?> classe, String fieldName) {
		String methodName = "get" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);

		try {
			return classe.getMethod(methodName, new Class[] {});
		} catch (NoSuchMethodException | SecurityException e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * Retorna o metodo setter de um atributo.
	 *
	 * @param classe
	 *            Classe do objetio
	 * @param f
	 *            Field que se quer o setter
	 * @return Objeto Method (java.lang.reflect)
	 */
	public static Method getSetterMethod(Class<?> classe, Field f) {
		String fieldName = f.getName();
		String methodName = "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);

		try {
			return classe.getMethod(methodName, new Class[] { f.getType() });
		} catch (NoSuchMethodException | SecurityException e) {
			log.error(e);
		}

		return null;
	}

	public static Method getSetterMethod(Class<?> classe, String fieldName) {
		String methodName = "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1);

		try {
			Field f = classe.getField(fieldName);
			return classe.getMethod(methodName, new Class[] { f.getType() });
		} catch (NoSuchMethodException | SecurityException | NoSuchFieldException e) {
			log.error(e);
		}

		return null;
	}

	/**
	 * Retorna o valor de um metodo
	 *
	 * @param getter
	 *            Metodo getter
	 * @param vo
	 *            Objeto vo a ser chamado
	 * @return Resultado do metodo, e nulo se houver alguma excessao.
	 */
	public static Object getValue(Method getter, Object vo) {
		try {
			if ((getter == null) || (vo == null)) {
				return null;
			}
			return getter.invoke(vo, new Object[] {});
		} catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			log.error(e);
		}

		return null;
	}

	/**
	 * Seta o valor de um atributo pelo setter
	 *
	 * @param setter
	 *            Metodo setter
	 * @param vo
	 *            Objecto vo a ser alterado
	 * @param value
	 *            Valor a ser setado
	 */
	public static void setValue(Method setter, Object vo, Object value) {
		try {
			setter.invoke(vo, value);
		} catch (IllegalArgumentException e) {
			if (value instanceof BigDecimal) {
				setValue(setter, vo, ((BigDecimal) value).intValue());
			}
		} catch (IllegalAccessException | InvocationTargetException e) {
			e.printStackTrace();
			log.fatal("Class: " + vo.getClass() + " Setter: " + setter.getName() + " Value: " + value + " Value Type: " + value.getClass(), e);
		}
	}

	/**
	 * Retorna o valor do Id do model / vo.
	 *
	 * @param classe
	 *            Classe do objeto
	 * @param vo
	 *            Objeto que possui o id
	 * @return Valor do Id
	 */
	public static Object getValueId(Class<?> classe, Object vo) {
		for (Field f : classe.getDeclaredFields()) {
			Id id = f.getAnnotation(Id.class);
			if (id != null) {
				return getValue(getGetterMethod(classe, f), vo);
			}
		}
		return null;
	}

	/**
	 * Seta o valor do Id do model / vo
	 *
	 * @param classe
	 *            Classe do objeto
	 * @param vo
	 *            Objeto que tera o id setado
	 * @param value
	 *            Valor do id
	 */
	public static void setValueId(Class<?> classe, Object vo, Object value) {
		if (vo == null) {
			return;
		}
		for (Field f : classe.getDeclaredFields()) {
			Id id = f.getAnnotation(Id.class);
			if (id != null) {
				setValue(getSetterMethod(classe, f), vo, value);
			}
		}
	}

	/**
	 * Retorna o tipo da classe do Id
	 *
	 * @param classe
	 *            Classe que a ser inspecionada
	 * @return Classe do Id
	 */
	public static Class<?> getIdType(Class<?> classe) {
		for (Field f : classe.getDeclaredFields()) {
			Id id = f.getAnnotation(Id.class);
			if (id != null) {
				return f.getType();
			}
		}
		return null;
	}

	public static Field getRecursiveProperty(Class<?> clazz, String property) {
		String fieldname = property;

		if (property.indexOf("$") > 0) {
			property = property.replace("$", ".");
		}

		int index = property.indexOf('.');

		if (index >= 0) {
			fieldname = property.substring(0, index);
		} else {
			index = property.indexOf('$');
			if (index >= 0) {
				fieldname = property.substring(0, index);
			}
		}

		Field[] fields = clazz.getDeclaredFields();

		boolean found = false;

		for (Field field : fields) {

			if (field.getName().equalsIgnoreCase(fieldname)) {
				if (index >= 0) {
					return getRecursiveProperty(field.getType(), property.substring(index + 1));
				} else {
					return field;
				}
			}
		}

		if (!found && (clazz.getSuperclass() != null)) { // Tenta na superclasse
			fields = clazz.getSuperclass().getDeclaredFields();

			for (Field field : fields) {
				if (field.getName().equalsIgnoreCase(fieldname)) {
					if (index >= 0) {
						return getRecursiveProperty(field.getType(), property.substring(index + 1));
					} else {
						return field;
					}
				}
			}
		}

		// Tenta na superclasse (2)
		if (!found && (clazz.getSuperclass() != null) && (clazz.getSuperclass().getSuperclass() != null)) {
			if ((clazz.getSuperclass() != null) && (clazz.getSuperclass().getSuperclass() != null)) {
				fields = clazz.getSuperclass().getSuperclass().getDeclaredFields();

				for (Field field : fields) {
					if (field.getName().equalsIgnoreCase(fieldname)) {
						if (index >= 0) {
							return getRecursiveProperty(field.getType(), property.substring(index + 1));
						} else {
							return field;
						}
					}
				}
			}
		}

		return null;
	}

	public static void copy(Object from, Object to) throws IntrospectionException {
		copy(from, to, false);
	}

	@Deprecated
	public static void copyOld(Object from, Object to, boolean skipID) {
		log.trace("Clonando entidade " + from.getClass().getSimpleName() + " para " + to.getClass().getSimpleName());

		Class<? extends Object> copy1 = from.getClass();
		Class<? extends Object> copy2 = to.getClass();

		Field[] fromFields = copy1.getDeclaredFields();
		Field[] toFields = copy2.getDeclaredFields();

		Object value = null;
		List<String> fieldsNames = new ArrayList<>();

		for (Field toField : toFields) {
			String fieldName = toField.getName();
			fieldsNames.add(fieldName);
		}

		for (Field fromField : fromFields) {
			if (!Modifier.isStatic(fromField.getModifiers())) {

				if (fieldsNames.contains(fromField.getName())) {

					Id id = fromField.getAnnotation(Id.class);
					if ((id == null) || skipID) {

						log.trace("Clonando campo " + fromField.getName());

						Method getter = getGetterMethod(from.getClass(), fromField);
						if (getter != null) {
							value = getValue(getter, from);

							Method setter = getSetterMethod(to.getClass(), fromField);

							if (setter != null) {
								setValue(setter, to, value);
							} else {
								log.trace("Field " + fromField.getName() + " não possui setter no destino!");
							}
						} else {
							log.trace("Field " + fromField.getName() + " não possui getter na origem!");
						}
					}
				} else {
					log.trace("Field " + fromField.getName() + " não está presente no atributo destino!");
				}
			}
		}
	}

	public static void copy(Object from, Object to, boolean skipID) {
		if (from == null) {
			log.trace("Objeto \"from\" está nulo.");
			return;
		} else if (to == null) {
			log.trace("Objeto \"to\" está nulo.");
			return;
		}

		log.trace("Clonando entidade " + from.getClass().getSimpleName() + " para " + to.getClass().getSimpleName());

		Class<? extends Object> classFrom = from.getClass();
		Class<? extends Object> classTo = to.getClass();

		try {

			BeanInfo beanInfoFrom;

			beanInfoFrom = Introspector.getBeanInfo(classFrom);

			BeanInfo beanInfoTo = Introspector.getBeanInfo(classTo);

			for (PropertyDescriptor pdSource : beanInfoFrom.getPropertyDescriptors()) {
				log.trace("Clonando campo " + pdSource.getName());

				if ((pdSource.getReadMethod() != null) && (pdSource.getWriteMethod() != null)) {
					// Busca o field para ver se tem a anotação @Id
					Field fromField = classFrom.getDeclaredField(pdSource.getName());

					Id id;
					id = fromField.getAnnotation(Id.class);
					OneToMany oneToMany = fromField.getAnnotation(OneToMany.class);

					if (((id == null) || skipID) && (oneToMany == null)) {
						boolean found = false;

						for (PropertyDescriptor pdTo : beanInfoTo.getPropertyDescriptors()) {

							if (pdSource.getName().equals(pdTo.getName())) {
								found = true;

								if (pdTo.getWriteMethod() != null) {
									Object value = getValue(pdSource.getReadMethod(), from);
									setValue(pdTo.getWriteMethod(), to, value);
								} else {
									log.trace("Field " + pdTo.getName() + " não possui setter no destino!");
								}
							}
						}
						if (!found) {
							log.trace("Field " + pdSource.getName() + " não está presente no atributo destino!");
						}
					} else {
						log.trace("Field " + pdSource.getName() + " não possui getter na origem!");
					}

					if (oneToMany != null) {

						boolean cascade = false;
						for (CascadeType cascadeType : oneToMany.cascade()) {
							if ((cascadeType == CascadeType.MERGE) || (cascadeType == CascadeType.ALL)) {
								cascade = true;
							}
						}

						if (cascade) {
							// Copiar lista de OneToMany
							Object valueSource = getValue(pdSource.getReadMethod(), from);
							Object valueTarget = null;

							boolean found = false;

							for (PropertyDescriptor pdTo : beanInfoTo.getPropertyDescriptors()) {

								if (pdSource.getName().equals(pdTo.getName())) {
									found = true;
									valueTarget = getValue(pdTo.getReadMethod(), to);
								}
							}

							if (!found) {
								log.trace("Field " + pdSource.getName() + " não está presente no atributo destino!");
							}

							if (found && (valueSource instanceof List<?>) && (valueTarget instanceof List<?>)) {
								@SuppressWarnings("unchecked")
								List<Object> listSource = (List<Object>) valueSource;
								@SuppressWarnings("unchecked")
								List<Object> listTarget = (List<Object>) valueTarget;

								// Passo 1: Remover quem nao esta na lista
								Iterator<?> iterator = listTarget.iterator();
								while (iterator.hasNext()) {
									Object itemSource = iterator.next();

									if (!listSource.contains(itemSource)) {
										iterator.remove();
									}
								}

								// Passo 2 : Atualizar e adicionar
								for (Object itemSource : listSource) {
									if (!listTarget.contains(itemSource) || (getValueId(itemSource.getClass(), itemSource) == null)) {
										// Se nao contém na lista, adiciona
										Object newTarget = null;
										try {
											newTarget = itemSource.getClass().newInstance();
										} catch (InstantiationException | IllegalAccessException e) {
										}
										copy(itemSource, newTarget);
										listTarget.add(newTarget);
									} else {
										// Se contém, apenas atualiza.
										Object newTarget = listTarget.get(listTarget.indexOf(itemSource));
										copy(itemSource, newTarget);
									}
								}
							}
						}
					}
				}
			}
		} catch (IntrospectionException | NoSuchFieldException | SecurityException e) {
			e.printStackTrace();
		}
	}

}
