# Current build

The active work is the Lit kit in `packages/webkit`, published through Storybook, Rollup, and the CDN. Entity-ref, the discovery service, Helm, JSON form rendering, and microfrontends are not in this build. Zustand stays at the app, not inside the kit.

Lookup for tags, attributes, events, icons, and theme setup is `packages/webkit/src/catalog.ts`, the `wk` CLI, and `webkit-mcp`. The element list is `packages/webkit/STRUCTURE.md`.

The notes below are the original brainstorm. They are not the build spec.

planning to create a UI platform on lit.js using storybook for developing common components that can be shared across multiple application for building UI. For state management will be using zustand, babel config, rollup, minify, cdn , 
/brainstorming
 
/using-superpowers
 
/creative
 
/ds-consumer
 
/design
 
/ds-producer
 
/architecture
 
/system-design

Here's what I have so far, including what you told me earlier about this project.

What I think you want: a shared component library ("webkit") built in Lit. Forms and UI are defined by JSON. It's developed and published through Storybook, bundled with Rollup (Babel, minified) and served from a CDN. Several apps and microfrontends consume it, each in its own repo. Zustand handles state.

Three things that could change the design:

Zustand and CDN delivery can collide. If two microfrontends each bundle their own copy of the store, they get separate stores and can't share state. The store either needs to be one shared, externalized module, or components should stay self-contained and Zustand should live at the app level.
Versions on one page. Custom element names are global. If app A loads webkit 1.x and app B loads 2.x, the second registration fails. Version-prefixed tags or a single shared loader avoid this.
Lit and Babel. Decorators and TypeScript need specific Babel plugin settings to work with Lit, so the config is worth settling early.

Tell me where I've got it wrong.

What's driving this? Describe what the teams building these apps do today and what's painful enough that you want a shared platform. For example, are forms being rebuilt in every app, are the apps on different frameworks, or is it something else?

I'm developing a ERP platform that can be used across multiple industries, and each industry can have different departments, and each department will be having multiple workflow and will be cross referencing the data. So the when a UI page and forms related to a particular department is developed and if I want to cross refernce it on different departments UI , then I'll have to rebuilt all the UI referncence from the scratch. but If a common platform, deploy application independently using a microfrontend architecture(helm, headlamp for deployment).

That makes the shape much clearer. Here's how I understand it.

The problem: The ERP serves several industries. Each industry has departments, and each department has its own workflows, pages and forms. The departments' data overlaps. Today, if Stores built a "material issue" form and Production needs to show or reuse it, someone rebuilds it. You want to build each piece once and let any department reference it.

Your answer: A shared Lit component platform (webkit) with JSON-defined forms and pages. Each department ships as its own microfrontend, deployed independently with Helm.

Two things I'd flag:

Headlamp is a Kubernetes dashboard, not a deployment tool. Helm does the deploying, and Headlamp lets you see what's running. If you meant Headlamp as the viewer, that's fine. If you expected it to drive releases, the pipeline you already have planned (Azure Pipelines plus Helm) does that job.
Your real problem is cross-referencing, not component sharing. A shared button or input library won't stop Production from rebuilding Stores' form. What stops it is being able to say "render Stores' material-issue form here, with this record." That is a bigger architectural decision than the Zustand, Rollup and CDN choices.

Tell me what I've got wrong.

One question, because the answer changes the design most: When Production "cross-references" a Stores form, what does the user actually see? Is it a link that opens the Stores page, the Stores form embedded inside a Production page, a lookup field that pulls in a Stores record, or a mix? Describe a real example from your ERP if you can.

an example would be If I created a document for a customer(during onboarding - basic customer accuqistion doc) , that will include facilities, collertal, borrowers, risk provided for a customer for certain item created once and those are interlinked and in UI need to show the data. and these application act independ based on USER IAM. So If i want to call the mudules directly deployed on the same cluster when I can directly reroute the application based on the mfe concept

That example answers my question. In your model, each record has one owning module, and other modules point at it. A customer's collateral is created and edited in the Collateral module. The onboarding page links to it by ID, and IAM decides who can open it. You said you'd route straight to the module on the cluster, so the primary need is navigation, not embedding.

Customer onboarding (Onboarding MFE)
  Borrowers   → Jane Doe, Acme Ltd    [open → /borrowers/42]
  Facilities  → FAC-1001              [open → /facilities/1001]
  Collateral  → COL-77                [open → /collateral/77]
  Risk rating → B+                    [open → /risk/customer/9]

Here are three ways to build it:

A. Route-level microfrontends. Each module is a full app on its own path. The ingress or gateway routes /collateral/* to the Collateral deployment. A cross-reference is a deep link with an entity ID, and a shared login (SSO/IAM token) carries the user across. This is the simplest option and fully independent to deploy. The cost is that the user leaves the page, so you lose context unless you handle a "back to customer" link.

B. Embedded remote components. The Onboarding page loads Collateral's components at runtime and renders them inline. The page feels unified, but you take on version coupling, custom-element name collisions, and checking permissions inside the embedded piece.

C. A hybrid. Use A as the base. On top of it, define an entityRef field type in your JSON schema. It resolves entity type to route (collateral → /collateral/{id}) from a registry. Later, a module can optionally expose a small read-only summary component for inline previews.

I'd pick C, built in order: A first, with the entityRef registry from day one. Cross-references then stay declarative, in the JSON instead of hard-coded links, which directly fixes your "rebuild from scratch" problem. The registry is also the natural place to hide or disable a link when the user lacks IAM access. It also removes my earlier Zustand concern. With route-level MFEs, state travels through the URL and the APIs, so each app can keep its own Zustand store.

Which way do you want to go: A, B, or C? If you'd rather leave it to me, I'll go with C.

C but explain with diagram how it works

Here is the flow when a user opens a customer's collateral from the onboarding page.

Here is the sequence, left to right:

Onboarding renders from JSON. The page definition has a field like { "type": "entityRef", "entity": "collateral", "id": "COL-77" }. webkit's JSON renderer turns it into a link, with no hand-written link per page.
The registry resolves it. It maps each entity type to its owning module's route (collateral → /collateral/{id}). It lives in webkit, so changing where an entity lives is one edit, not a hunt through every page.
The ingress routes by path. /collateral/* goes to the Collateral deployment on the same cluster. Each module is its own Helm release, so you deploy and roll back modules independently.
IAM decides access. The ingress or gateway validates the user's token, and the owning module's API enforces permissions on the data itself. The registry can also hide or disable the link up front when the user has no access.
The owning module renders its own page. It reads from its own Data API, so there is only one copy of the collateral and one form for it.

The teal band shows what is shared: components, the JSON renderer and the entityRef field all come from webkit on the CDN. Each department keeps its own deployment and data.

This is a full project, so the next step is a written design doc: goals and non-goals, the approach we just picked, and the stack decisions (Lit, Storybook, Rollup, Babel, Zustand). I'd also write down the points that are still open, such as how the shared login carries across modules and how webkit versions are rolled out. Is there anything in the diagram you'd change before I write it up?

Forget about the json for now

Dropping JSON changes less than you might expect, because JSON was only how pages were described, not how the modules connect. Here is what changes and what stays.

What changes: Step 1 of the diagram. Instead of a JSON field rendering a link, each page uses a normal Lit component from webkit, something like <entity-ref entity="collateral" id="COL-77">. Developers write the page in code. The component asks the registry for the route, builds the link and applies the access check.

What stays the same:

The registry (entity type to route), the ingress path routing, and the IAM check.
One Helm release per module, with the owning module holding its own data.
webkit on the CDN as the shared component library, developed and published through Storybook, bundled with Rollup and Babel, minified.
Zustand per app. Cross-module context travels through the URL and the APIs.

One benefit of deferring it: the entity-ref component and the registry contract are the same ones a JSON renderer would call later. If you bring JSON back, you add a renderer on top and nothing underneath changes.

Shall I write the design doc on this basis: Lit components, Storybook, the registry, route-level microfrontends, Helm deployment, and JSON listed as a later phase?

Can there be a UI element discovery service that would be defined as a base helm chart

Thought for 10s

Weighing whether a Helm base chart can host service discovery.

Sketching a registry-and-library-chart design for the modules.

Comparing three ways for modules to announce themselves.

Yes, and it fits your multi-industry ERP well. It would replace the compiled-in registry from the diagram. entity-ref would ask the discovery service which module owns collateral and where it is, instead of reading a hard-coded map.

What the base chart does: Make it a Helm library chart, which every module's chart declares as a dependency. It standardizes what each module deploys: the Deployment, the Service, the ingress path, and a small descriptor of what the module offers. Each module only fills in values.yaml (name, route, entity types it owns, components it exposes, roles required).

The benefit specific to you: Discovery reflects what is actually deployed. A bank deploys Credit and Collateral, a manufacturer deploys Stores and Production, and entity-ref automatically hides or disables links to modules that aren't in that cluster. You never maintain a per-industry registry.

There are three ways to build the discovery part:

A. Labeled ConfigMap. The base chart emits the descriptor as a ConfigMap with a standard label. The discovery service watches the Kubernetes API for those and serves GET /discovery/entities. There is no code inside the modules and no new infrastructure. The service needs read-only RBAC on ConfigMaps.

B. Modules serve their own manifest. Each module exposes a manifest endpoint and the discovery service polls labeled Services. It's flexible, but every module now needs the endpoint, and a down module means a failed poll.

C. A custom resource (CRD) with a controller. This is the cleanest and gives you schema validation. It also means you now build and operate a controller, which is heavy at the start.

I'd start with A and move to C if you outgrow it. Either way, webkit should cache the discovery response and degrade to "link disabled" if the service is unreachable.

Which would you like: A, B, or C? If you leave it to me, I'll go with A.