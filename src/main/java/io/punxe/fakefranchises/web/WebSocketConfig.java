package io.punxe.fakefranchises.web;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@CrossOrigin
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
  
    //This is what Stomp uses to add websocket endpoints.
    //For production build, make the setAllowedOrigins to be the website URL
    //For testing build, make the setAllowedOrigins to be the localhost
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/game");
        //registry.addEndpoint("/game").setAllowedOrigins("http://localhost:3000").withSockJS();
        registry.addEndpoint("/game").setAllowedOrigins("https://fakefranchises.azurewebsites.net").withSockJS();
    }

    //This makes a message broker and creates the /app destination prefix
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config){
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    
}
