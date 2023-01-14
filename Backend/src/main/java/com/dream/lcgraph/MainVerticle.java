package com.dream.lcgraph;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.DeploymentOptions;
import io.vertx.core.Promise;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;

public class MainVerticle extends AbstractVerticle {

  @Override
  public void start(Promise<Void> startPromise) throws Exception {
    // Scale application
    DeploymentOptions opts = new DeploymentOptions()
                              .setWorker(true)
                              .setInstances(8);

    // Register other verticle
    vertx.deployVerticle("com.dream.lcgraph.HelloVertice", opts);

    // Similar to Express, gives capability to give handeler to different router
    Router router = Router.router(vertx);
    router.get("/api/v1/hello").handler(this::helloVertx);
    router.get("/api/v1/nope").handler(this::helloName);

    vertx.createHttpServer().requestHandler(router).listen(8080);
  }

  void helloVertx(RoutingContext ctx) {
    vertx.eventBus().request("hello.vertx.addr", "", reply -> {
      ctx.request().response().end((String) reply.result().body());
    });
  }

  void helloName(RoutingContext ctx) {
    String name = ctx.pathParam("name");
    vertx.eventBus().request("hello.named.addr", name, reply -> {
      ctx.request().response().end((String) reply.result().body());
    });
  }
}
