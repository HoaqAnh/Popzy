package com.propzy.propzy.domain.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class RestResponse<T> implements Serializable {

    private int statusCode;
    private String error;

    private Object message;
    private T data;
}
