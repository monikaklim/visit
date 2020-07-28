package it.scai.visit.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	protected static final Logger log = LoggerFactory.getLogger(WebSecurityConfig.class);
	
	    @Bean
	    public CorsFilter corsFilter() {
	        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	        CorsConfiguration config = new CorsConfiguration();
	        config.setAllowCredentials(true);
	        config.addAllowedOrigin("*");  // TODO: lock down before deploying
	        config.addAllowedHeader("*");
	        config.addExposedHeader(HttpHeaders.AUTHORIZATION);
	        config.addAllowedMethod("*");
	        source.registerCorsConfiguration("/**", config);
	        return new CorsFilter(source);
	    }
    
	    @Bean
	    public JwtLoginFilter signInFilter() throws Exception {
	        return new JwtLoginFilter(
	        		"/visit/signin",
	            authenticationManager()
	        );
	    }
	    
	    @Bean
	    public JwtAuthenticationFilter authFilter() {
	        return new JwtAuthenticationFilter();
	    }
	    
	  @Override
	  protected void configure(HttpSecurity http) throws Exception {
		  log.info("WebSecurityConfig");
		  http.cors()
          .and()
          .csrf().disable()
          .authorizeRequests()
          .antMatchers("/visit/signin").permitAll()
          .anyRequest().authenticated()
          .and()
          .addFilterBefore(
              signInFilter(),
              UsernamePasswordAuthenticationFilter.class
          )
          .addFilterBefore(
              authFilter(),
              UsernamePasswordAuthenticationFilter.class
          )
          .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	  }

	  @Override
	  public void configure(WebSecurity web) throws Exception {
	    // Allow swagger to be accessed without authentication
	    web.ignoring().antMatchers("/", "/resources/**", "/static/**", "/public/**", "/webui/**", "/h2-console/**"
	            , "/configuration/**", "/swagger-ui/**", "/swagger-resources/**", "/api-docs", "/api-docs/**", "/v2/api-docs/**"
	            , "/*.html", "/**/*.html" ,"/**/*.css","/**/*.js","/**/*.png","/**/*.jpg", "/**/*.gif", "/**/*.svg", "/**/*.ico", "/**/*.ttf","/**/*.woff","/**/*.otf");
	    
	  }

	  @Bean
	  public BCryptPasswordEncoder passwordEncoder() {
	      return new BCryptPasswordEncoder();
	  }
	  
}
