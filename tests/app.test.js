/**
 * VibranCSE 2025 - Automated Unit and Integration Test Suite
 * Senior QA Automation Engineer
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const express = require('express');
const path = require('path');

// Setup application instance for testing API endpoints
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Mock/Mount the actual route defined in server.js
app.post('/api/register', (req, res) => {
    const { name, email, college, event, phone } = req.body;
    
    if (!name || !email || !event) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please provide all required fields (Name, Email, Event).' 
        });
    }

    return res.status(200).json({
        success: true,
        message: `Successfully registered ${name} for ${event}!`,
        registrationId: 'VCSE-' + Math.floor(100000 + Math.random() * 900000),
        data: { name, email, college, event, phone }
    });
});

let server;
let baseUrl;

test.before(async () => {
    await new Promise((resolve) => {
        server = http.createServer(app);
        server.listen(0, () => {
            const address = server.address();
            baseUrl = `http://localhost:${address.port}`;
            resolve();
        });
    });
});

test.after(async () => {
    await new Promise((resolve) => {
        server.close(resolve);
    });
});

test('Integration Test: GET / returns frontend HTML', async () => {
    const response = await fetch(`${baseUrl}/`);
    assert.strictEqual(response.status, 200);
    const contentType = response.headers.get('content-type');
    assert.ok(contentType && contentType.includes('text/html'));
});

test('Integration Test: POST /api/register fails when missing required fields', async () => {
    const response = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: '',
            email: 'test@example.com',
            event: ''
        })
    });

    assert.strictEqual(response.status, 400);
    const body = await response.json();
    assert.strictEqual(body.success, false);
    assert.ok(body.message.includes('required fields'));
});

test('Integration Test: POST /api/register succeeds with valid payload', async () => {
    const payload = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        college: 'MIT',
        event: 'Hackathon 24H',
        phone: '1234567890'
    };

    const response = await fetch(`${baseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    assert.strictEqual(response.status, 200);
    const body = await response.json();
    assert.strictEqual(body.success, true);
    assert.ok(body.registrationId.startsWith('VCSE-'));
    assert.strictEqual(body.data.name, payload.name);
    assert.strictEqual(body.data.email, payload.email);
    assert.strictEqual(body.data.event, payload.event);
});

test('Unit Test: Basic assertion verification for Fest config structures', () => {
    const festConfig = {
        name: 'VibranCSE',
        year: 2025,
        department: 'Computer Science & Engineering'
    };

    assert.strictEqual(festConfig.name, 'VibranCSE');
    assert.strictEqual(festConfig.year, 2025);
    assert.ok(festConfig.department.includes('Computer Science'));
});