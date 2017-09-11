package br.com.orlandoburli.seguranca.core.exceptions;

import javax.ws.rs.ext.ContextResolver;

/**
 ** Custom configuration of validation. This configuration can define custom:
 ** <ul>
 ** <li>MessageInterpolator - interpolates a given constraint violation message.
 * </li>
 ** <li>TraversableResolver - determines if a property can be accessed by the
 * Bean Validation provider.</li>
 ** <li>ConstraintValidatorFactory - instantiates a ConstraintValidator instance
 * based off its class.
 ** <li>ParameterNameProvider - provides names for method and constructor
 * parameters.</li> *
 ** </ul>
 */
// @Provider
public class ValidationConfigurationContextResolver implements ContextResolver<Object> {

	/**
	 * Get a context of type {@code GeneralValidator} that is applicable to the
	 * supplied type.
	 *
	 * @param type
	 *            the class of object for which a context is desired
	 * @return a context for the supplied type or {@code null} if a context for
	 *         the supplied type is not available from this provider.
	 */
	// @Override
	// public GeneralValidator getContext(Class<?> type) {
	// Configuration<?> config = Validation.byDefaultProvider().configure();
	// BootstrapConfiguration bootstrapConfiguration =
	// config.getBootstrapConfiguration();
	//
	// // config.messageInterpolator(new
	// //
	// LocaleSpecificMessageInterpolator(Validation.byDefaultProvider().configure().getDefaultMessageInterpolator()));
	//
	// return new GeneralValidatorImpl(config.buildValidatorFactory(),
	// bootstrapConfiguration.isExecutableValidationEnabled(),
	// bootstrapConfiguration.getDefaultValidatedExecutableTypes());
	// }

	@Override
	public Object getContext(Class<?> arg0) {
		return null;
	}
}
