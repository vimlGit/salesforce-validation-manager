package com.vks.salesforce_backend.controller;


import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://salesforce-validation-manager-nine.vercel.app" }
)
public class SalesforceController {

    @GetMapping("/rules")
    public ResponseEntity<?> getRules(
            @RequestParam String token,
            @RequestParam String instanceUrl
    ) {

        try {

            String query =
                    "SELECT Id, ValidationName, Active FROM ValidationRule";

            String url =
                    instanceUrl +
                            "/services/data/v59.0/tooling/query?q=" +
                            query.replace(" ", "+");

            HttpHeaders headers = new HttpHeaders();

            headers.setBearerAuth(token);

            HttpEntity<String> entity =
                    new HttpEntity<>(headers);

            RestTemplate restTemplate =
                    new RestTemplate();

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.GET,
                            entity,
                            String.class
                    );

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PatchMapping("/toggleRule")
    public ResponseEntity<?> toggleRule(
            @RequestBody Map<String, Object> request
    ) {

        try {

            String token =
                    request.get("token").toString();

            String instanceUrl =
                    request.get("instanceUrl").toString();

            String ruleId =
                    request.get("ruleId").toString();

            Boolean active =
                    (Boolean) request.get("active");

            HttpHeaders headers =
                    new HttpHeaders();

            headers.setBearerAuth(token);

            headers.setContentType(MediaType.APPLICATION_JSON);

            RestTemplate restTemplate =
                    new RestTemplate(
                            new org.springframework.http.client.HttpComponentsClientHttpRequestFactory()
                    );

            // STEP 1 FETCH FULL RULE

            String getUrl =
                    instanceUrl +
                            "/services/data/v59.0/tooling/sobjects/ValidationRule/" +
                            ruleId;

            HttpEntity<String> getEntity =
                    new HttpEntity<>(headers);

            ResponseEntity<Map> getResponse =
                    restTemplate.exchange(
                            getUrl,
                            HttpMethod.GET,
                            getEntity,
                            Map.class
                    );

            Map body =
                    getResponse.getBody();

            Map metadata =
                    (Map) body.get("Metadata");

            // UPDATE ACTIVE STATUS

            metadata.put("active", active);

            Map<String, Object> updateBody =
                    Map.of("Metadata", metadata);

            HttpEntity<Map<String, Object>> patchEntity =
                    new HttpEntity<>(updateBody, headers);

            // STEP 2 PATCH UPDATE

            ResponseEntity<String> patchResponse =
                    restTemplate.exchange(
                            getUrl,
                            HttpMethod.PATCH,
                            patchEntity,
                            String.class
                    );

            return ResponseEntity.ok("Updated Successfully");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
