package it.scai.visit.model;

public class ApplicationToken implements ResponseBean {

		private String token;
		
		private Long expires;

		public String getToken() {
			return token;
		}

		public void setToken(String token) {
			this.token = token;
		}

		public Long getExpires() {
			return expires;
		}

		public void setExpires(Long expires) {
			this.expires = expires;
		}
}
