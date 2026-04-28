$routes = @(
    "/",
    "/courses",
    "/about",
    "/methodology",
    "/contact",
    "/pricing",
    "/instructors",
    "/faq",
    "/careers",
    "/blog",
    "/privacy",
    "/terms",
    "/courses/project-management-trello",
    "/learn/project-management-trello"
)

foreach ($route in $routes) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000$route" -UseBasicParsing -TimeoutSec 5
        Write-Host "[OK] $route -> $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "[FAIL] $route -> $($_.Exception.Message)" -ForegroundColor Red
    }
}
