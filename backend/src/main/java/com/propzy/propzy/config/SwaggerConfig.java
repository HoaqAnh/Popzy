package com.propzy.propzy.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.media.Schema;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Propzy API")
                        .version("1.0.0")
                        .description("API Documentation"))
                .components(new Components()
                        .addSchemas("RestResponse", createRestResponseSchema()));
    }

    private Schema createRestResponseSchema() {
        return new Schema()
                .type("object")
                .addProperties("status", new Schema().type("integer"))
                .addProperties("message", new Schema().type("string"))
                .addProperties("data", new Schema().type("object"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/**")
                .build();
    }
}

