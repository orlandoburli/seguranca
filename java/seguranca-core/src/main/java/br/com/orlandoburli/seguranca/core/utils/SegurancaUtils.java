package br.com.orlandoburli.seguranca.core.utils;

import java.math.BigInteger;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.HttpServletRequest;

public class SegurancaUtils {

	public static String md5(String source) {
		MessageDigest m;
		try {
			m = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			return null;
		}

		m.update(source.getBytes(), 0, source.length());

		return new BigInteger(1, m.digest()).toString(16);
	}

	public static String getIpFromRequest(HttpServletRequest request) {
		String ipAddress = request.getHeader("X-FORWARDED-FOR");
		if (ipAddress == null) {
			ipAddress = request.getRemoteAddr();
		}
		return ipAddress;
	}

	public static String getComputerNameFromIP(String ipAddress) {
		InetAddress inetAddress = null;

		try {
			inetAddress = InetAddress.getByName(ipAddress);
		} catch (UnknownHostException e) {
			e.printStackTrace();
			return null;
		}

		String computerName = inetAddress.getHostName();
		return computerName;
	}
}