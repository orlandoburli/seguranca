package br.com.orlandoburli.seguranca.core.annotations;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.TYPE;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ FIELD, TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface EnumType {
	Class<?> value();

	String callbackMethod() default "getValor";
}
