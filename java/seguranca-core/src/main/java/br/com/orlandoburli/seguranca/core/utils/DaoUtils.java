package br.com.orlandoburli.seguranca.core.utils;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import org.apache.log4j.Logger;

public class DaoUtils {

	private final static Logger log = Logger.getLogger(DaoUtils.class.getName());

	/**
	 * Este método recebe o RequestGridFilter e transforma em filtro para a
	 * camada DAO.
	 *
	 * @return String compilada em HQL para ser adicionado ao HQL base.
	 */
	public static String buildWhereStatement(Map<String, String> filtros, Class<?> voClass, Map<String, Object> parametros) {

		StringBuilder sb = new StringBuilder();

		// Primeiro nos parameters
		Iterator<String> iterator = filtros.keySet().iterator();

		while (iterator.hasNext()) {
			String key = iterator.next();

			try {
				String value = filtros.get(key) == null ? "" : filtros.get(key).trim();

				if (key.indexOf("$") >= 0) {
					key = key.replace("$", ".");
				}

				log.debug("Setando " + key + " valor: " + value);

				buildCondition(voClass, sb, key, value, parametros);

			} catch (NoSuchFieldException e) {
				log.trace("Field nao encontrado ou não acessível: " + key + " em " + voClass.getName());
			}
		}

		return sb.toString().trim();
	}

	private static void buildCondition(Class<?> voClass, StringBuilder sb, String key, String value, Map<String, Object> chaves) throws NoSuchFieldException {
		if ((value != null) && !value.trim().equals("")) {

			Field f = null;
			// De acordo com o nome, o field tem tratamentos
			// especiais, como "Inicial" e "Final"

			if (key.endsWith("Inicial")) {
				String fieldName = key.substring(0, key.length() - "Inicial".length());
				f = ReflectionUtils.getRecursiveProperty(voClass, fieldName);

				if (f != null) {
					sb.append(" AND e." + fieldName + " >= :p_" + fieldName);

					chaves.put("p_" + fieldName, buildCast(voClass, key, value));
				}
			} else if (key.endsWith("Final")) {
				String fieldName = key.substring(0, key.length() - "Final".length());
				f = ReflectionUtils.getRecursiveProperty(voClass, fieldName);

				if (f != null) {
					sb.append(" AND e." + fieldName + " <= :p_" + fieldName);

					chaves.put("p_" + fieldName, buildCast(voClass, key, value));
				}
			} else {
				f = ReflectionUtils.getRecursiveProperty(voClass, key);

				String fieldName = key.replace(".", "_");

				if (f != null) {
					if (f.getType().equals(String.class)) {
						sb.append(" AND UPPER(e." + key + ") LIKE UPPER(:p_" + fieldName + ")");
					} else {
						sb.append(" AND e." + key + " = :p_" + fieldName);
					}

					chaves.put("p_" + fieldName, buildCast(voClass, key, value));
				}
			}
		}
	}

	public static Object[] castParameters(Map<String, String> filtros, Class<?> voClass) {

		Iterator<String> iterator = filtros.keySet().iterator();

		List<Object> list = new ArrayList<>();

		while (iterator.hasNext()) {
			String key = iterator.next();

			try {

				String value = filtros.get(key) == null ? "" : filtros.get(key);

				list.add(buildCast(voClass, key, value));

			} catch (NoSuchFieldException e) {
				log.trace("Field nao encontrado ou não acessível: " + key + " em " + voClass.getName());
			}
		}

		return list.toArray();
	}

	private static Object buildCast(Class<?> voClass, String key, String value) throws NoSuchFieldException {
		if ((value != null) && !value.trim().equals("")) {

			Field f = null;
			// De acordo com o nome, o field tem tratamentos
			// especiais, como "Inicial" e "Final"

			if (key.endsWith("Inicial")) {
				f = ReflectionUtils.getRecursiveProperty(voClass, key.substring(0, key.length() - "Inicial".length()));
			} else if (key.endsWith("Final")) {
				f = ReflectionUtils.getRecursiveProperty(voClass, key.substring(0, key.length() - "Final".length()));
			} else {
				f = ReflectionUtils.getRecursiveProperty(voClass, key);
			}

			// Method getterMethod =
			// ReflectionUtils.getGetterMethod(f.getDeclaringClass(), f);

			Class<?> typeField = f.getType();

			// if (getterMethod != null) {
			// typeField = getterMethod.getReturnType();
			// }

			if (f != null) {
				// Tratamento para cada tipo de dados

				if (typeField.equals(int.class) || typeField.equals(Integer.class)) {
					try {
						int parseInt = Integer.parseInt(value);

						return parseInt;
					} catch (NumberFormatException e) {
						return 0;
					}
				} else if (typeField.equals(UUID.class)) {
					try {
						return UUID.fromString(value);
					} catch (IllegalArgumentException e) {
						return null;
					}
				} else if (typeField.equals(double.class) || typeField.equals(Double.class) || typeField.equals(BigDecimal.class)) {
					try {
						String valorString = value.toString().replace("R$", "").trim();

						// Elimina os pontos (separador de decimais)
						valorString = valorString.replace(".", "");

						// Substitui as virgulas por pontos
						valorString = valorString.replace(",", ".");

						if ((value != null) && (valorString.length() > 0)) {

							if (typeField.equals(BigDecimal.class)) {
								BigDecimal valor = new BigDecimal(valorString);

								return valor;
							} else {
								Double doubleval = NumberFormat.getCurrencyInstance(Locale.US).parse(valorString).doubleValue();

								return doubleval;
							}
						} else {
							if (typeField.equals(BigDecimal.class)) {
								return BigDecimal.ZERO;
							} else {
								return 0;
							}
						}
					} catch (Exception ex) {
						if (typeField.equals(BigDecimal.class)) {
							return BigDecimal.ZERO;
						} else {
							return 0;
						}
					}
				} else if (typeField.equals(Calendar.class)) {
					try {
						if ((value != null) && (value.toString().trim().length() == 10)) {
							SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
							Calendar cal = Calendar.getInstance();
							cal.setTimeInMillis(sdf.parse(value.toString()).getTime());

							return cal;
						} else {
							return Calendar.getInstance();
						}
					} catch (Exception ex) {
						// Nao conseguiu setar... passa reto
						return Calendar.getInstance();
					}
				} else if (typeField.equals(String.class)) {
					return ("%" + (value == null ? "" : value) + "%");
				} else if (typeField.isEnum()) {
					// Converte valores para ENUM's
					Object valueToEnum = enumToValue(value, f);

					return valueToEnum;
				}
			}
		}

		return null;
	}

	public static Object enumToValue(String value, Field f) {

		try {
			Method method = null;
			try {
				method = f.getType().getDeclaredMethod("fromValue", String.class);
			} catch (NoSuchMethodException e1) {
				method = f.getType().getDeclaredMethod("fromValue", Integer.class);
			}

			if (method != null) {
				if (method.getReturnType().equals(Void.class)) {
					log.warn("Método \"fromValue\" do enum \"\" não retorna dados");
					return null;
				}
				Object result = method.invoke(null, value);

				return result;
			}
		} catch (NoSuchMethodException | SecurityException | IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
			log.warn(e.getMessage(), e);
			return null;
		}

		return null;
	}
}
