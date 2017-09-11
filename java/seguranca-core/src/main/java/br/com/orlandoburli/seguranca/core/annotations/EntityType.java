package br.com.orlandoburli.seguranca.core.annotations;

import static java.lang.annotation.ElementType.FIELD;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface EntityType {
	String value() default "id";
}
